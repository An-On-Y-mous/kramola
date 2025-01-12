import "dotenv/config";
import express from "express";
import pg from "pg";
import OpenAI from "openai";
import { getJson } from "serpapi";

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

// Transliteration and helper functions remain unchanged
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

const transliterateRussian = (text) => {
  return text
    .split("")
    .map((char) => russianTransliteration[char] || char)
    .join("");
};

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

function extractJSON(text) {
  try {
    // Attempt to parse as JSON
    return JSON.parse(text);
  } catch (e) {
    // Sanitize the input to remove invalid characters
    const sanitizedText = text.replace(/[\x00-\x1F\x7F]/g, "");
    const jsonMatch = sanitizedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (innerError) {
        throw new Error(
          `Malformed JSON after sanitization: ${innerError.message}`
        );
      }
    }
    throw new Error("Could not extract valid JSON from response");
  }
}

// Updated processNewsContent function remains unchanged
async function processNewsContent(title) {
  const prompt = `
  You are a multilingual news processor. Search the web for information about this news title and create a comprehensive article with translations.

  News Title: "${title}"

  Tasks:
  1. Search recent web sources to gather information about this news topic.
  
  2. Generate a detailed description (300-400 words) that:
     - Summarizes the key points and context from your web search
     - Includes relevant background information and latest developments
     - Presents multiple perspectives if applicable
     - Uses professional journalistic tone
     - Adds proper paragraph breaks using <br /> <br />
     - Focuses on factual information from reliable sources
     - Includes recent context and developments
     - Remove [1] [2] [3] so on.. references from the text

  3. Translate both the title and generated description into Spanish and Russian.

  Respond with ONLY a JSON object in this format:
  {
    "translations": {
      "en": { "title": "English title", "description": "Generated English description with sources" },
      "es": { "title": "Spanish title", "description": "Spanish translation of description" },
      "ru": { "title": "Russian title", "description": "Russian translation of description" }
    }
  }`;

  const completion = await openai.chat.completions.create({
    model: "llama-3.1-sonar-small-128k-online",
    messages: [
      {
        role: "system",
        content:
          "You are a professional multilingual news processor with web search capabilities. Generate comprehensive descriptions based on current web sources and provide accurate translations.",
      },
      { role: "user", content: prompt },
    ],
  });

  const response = completion.choices[0].message.content;
  const processedContent = extractJSON(response);

  processedContent.translations.en.title = title;

  return processedContent;
}

// Database storage function remains unchanged
async function storeNewsInDatabase(newsItem, processedContent) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const newsResult = await client.query(
      `INSERT INTO news (date, source_url, img_url) VALUES ($1, $2, $3) RETURNING id`,
      [new Date(), newsItem.link, newsItem.thumbnail || null]
    );

    const newsId = newsResult.rows[0].id;
    const translations = [];

    for (const locale of ["en", "es", "ru"]) {
      const translation = {
        locale,
        title: processedContent.translations[locale].title,
        description: processedContent.translations[locale].description.replace(
          /\[\d+\]/g,
          ""
        ),
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

// Main endpoint
app.get("/api/fetch-news", async (req, res) => {
  try {
    const results = [];
    const newsToProcessCount = 1;
    let newsToProcess = [];

    await getJson(
      {
        engine: "google_news",
        gl: "us",
        hl: "en",
        topic_token: "CAAqJQgKIh9DQkFTRVFvSUwyMHZNRFZ4ZERBU0JXVnVMVWRDS0FBUAE",
        api_key: process.env.SERP_API_KEY,
      },
      (json) => {
        // Filter and slice valid news items
        newsToProcess = (json["news_results"] || [])
          .filter((news) => news.source && news.title)
          .slice(0, newsToProcessCount);

        console.log("Filtered news:", newsToProcess);
      }
    );

    if (newsToProcess.length === 0) {
      console.log("No valid news to process.");
      return res.status(404).json({ message: "No valid news to process." });
    }

    for (const newsItem of newsToProcess) {
      try {
        const processedContent = await processNewsContent(newsItem.title);
        const { newsId, translations } = await storeNewsInDatabase(
          newsItem,
          processedContent
        );

        results.push({
          newsId,
          status: "success",
          title: newsItem.title,
          translations,
        });
      } catch (error) {
        console.error(`Error processing news item: ${newsItem.title}`, error);
        results.push({
          status: "error",
          title: newsItem.title,
          error: error.message,
        });
      }
    }

    res.json({ total: newsToProcess.length, processed: results });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch and process news" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
