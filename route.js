import "dotenv/config";
import express from "express";
import pg from "pg";
import fetch from "node-fetch";
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

// PostgreSQL connection setup
const pool = new pg.Pool({
  connectionString: process.env.POSTGRESQL_URL,
});

// Transliteration map for Russian characters
const russianTransliteration = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  А: "A",
  Б: "B",
  В: "V",
  Г: "G",
  Д: "D",
  Е: "E",
  Ё: "Yo",
  Ж: "Zh",
  З: "Z",
  И: "I",
  Й: "Y",
  К: "K",
  Л: "L",
  М: "M",
  Н: "N",
  О: "O",
  П: "P",
  Р: "R",
  С: "S",
  Т: "T",
  У: "U",
  Ф: "F",
  Х: "Kh",
  Ц: "Ts",
  Ч: "Ch",
  Ш: "Sh",
  Щ: "Sch",
  Ъ: "",
  Ы: "Y",
  Ь: "",
  Э: "E",
  Ю: "Yu",
  Я: "Ya",
};

// Function to transliterate Russian text
const transliterateRussian = (text) => {
  return text
    .split("")
    .map((char) => russianTransliteration[char] || char)
    .join("");
};

// Function to generate a slug
const generateSlug = (title, locale) => {
  if (!title) return `untitled-${Date.now()}`;
  let processedTitle = locale === "ru" ? transliterateRussian(title) : title;

  return processedTitle
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

// Function to generate a unique slug
const generateUniqueSlug = async (title, locale, client) => {
  if (!title) return `untitled-${Date.now()}`;
  let baseSlug = generateSlug(title, locale);

  const checkSlug = async (testSlug) => {
    const result = await client.query(
      "SELECT COUNT(*) FROM news_translations WHERE slugTitle = $1 AND locale = $2",
      [testSlug, locale]
    );
    return parseInt(result.rows[0].count) > 0;
  };

  let counter = 0;
  let uniqueSlug = baseSlug;

  while (await checkSlug(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }

  return uniqueSlug;
};

// Function to extract JSON from AI response
function extractJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Could not extract valid JSON from response");
  }
}

// Function to process and translate news content using OpenAI
async function processNewsContent(title, description) {
  const prompt = `
    You are a language translation AI. Your task is to translate the following news content into Spanish and Russian, and provide an improved description in all language.

    Original Title: "${title}"
    Original Description: "${description}"

     Please provide:
  1. Translations of the title and description in Spanish and Russian
  2. Title should be as same as the fetched title remove any letter before ":" from the starting of the title only.
  3. An improved description in English, Russian, Spanish (300-1000 words) that:
     - Add Necessary pair of line breaks (<br /> <br />) for all description. Don't add hashtags (#) nor bold any text (that is Asterisks (**)) and remove any like this [1] [2] [3] so on.
     - Includes additional context and related information related to the topic on the web
     - Use a professional yet conventional tone for easier to understand.

    Respond with ONLY a JSON object in this exact format, with no additional text or markdown:
    {
      "translations": {
        "en": { "title": "English title", "description": "Improved English description" },
        "es": { "title": "Spanish title", "description": "Spanish description" },
        "ru": { "title": "Russian title", "description": "Russian description" }
      }
    }`;

  const completion = await openai.chat.completions.create({
    model: "llama-3.1-sonar-huge-128k-online",
    messages: [
      {
        role: "system",
        content:
          "You are a translator AI. Always respond with valid JSON only.",
      },
      { role: "user", content: prompt },
    ],
  });

  const response = completion.choices[0].message.content;
  return extractJSON(response);
}

// Function to store news in the database
async function storeNewsInDatabase(newsItem, processedContent) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const newsResult = await client.query(
      `INSERT INTO news (date, source_url, img_url) VALUES ($1, $2, $3) RETURNING id`,
      [
        new Date(newsItem.datePublished),
        newsItem.url,
        newsItem.image?.thumbnail?.contentUrl || null,
      ]
    );

    const newsId = newsResult.rows[0].id;
    const translations = [];

    for (const locale of ["en", "es", "ru"]) {
      const translation = {
        locale,
        title: processedContent.translations[locale].title,
        description: processedContent.translations[locale].description,
      };

      translation.slugTitle = await generateUniqueSlug(
        translation.title,
        locale,
        client
      );
      translations.push(translation);

      await client.query(
        `INSERT INTO news_translations (news_id, title, description, slugTitle, locale) VALUES ($1, $2, $3, $4, $5)`,
        [
          newsId,
          translation.title,
          translation.description,
          translation.slugTitle,
          translation.locale,
        ]
      );
    }

    await client.query("COMMIT");
    return { newsId, translations };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

// Endpoint to process and store news
app.get("/api/fetch-news", async (req, res) => {
  try {
    const fetchedNews = await fetch(
      `https://api.bing.microsoft.com/v7.0/news?mkt=en-us&category=Politics`,
      {
        cache: "force-cache",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": process.env.BING_NEWS_API_KEY,
        },
      }
    );

    const data = await fetchedNews.json();
    console.log(data);

    const results = [];
    const newsToProcess = data.value.slice(0, 2);

    for (const newsItem of newsToProcess) {
      try {
        const processedContent = await processNewsContent(
          newsItem.name,
          newsItem.description
        );
        const { newsId, translations } = await storeNewsInDatabase(
          newsItem,
          processedContent
        );
        results.push({
          newsId,
          status: "success",
          title: newsItem.name,
          translations,
        });
      } catch (error) {
        results.push({
          status: "error",
          title: newsItem.name,
          error: error.message,
        });
      }
    }
    res.json({ total: newsToProcess.length, processed: results });
  } catch (error) {
    console.error(`Error processing news item: ${newsItem.name}`, error);
    results.push({
      status: "error",
      title: newsItem.name,
      error: error.message,
    });
  } finally {
    await pool.end();
    console.log("News Added Successfully");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
