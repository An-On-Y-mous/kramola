import "dotenv/config";
import express from "express";
import pg from "pg";
import fetch from "node-fetch";
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: "https://api.perplexity.ai",
});

// getereate slug()
const generateSlug = (title) => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+/, "") // Remove leading hyphens
    .replace(/-+$/, ""); // Remove trailing hyphens
};

app.get("/api/fetch-news", async (req, res) => {
  try {
    console.log(
      "================================================================"
    );
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
    // console.log("Bing News API Key", process.env.BING_NEWS_API_KEY);
    const data = await fetchedNews.json();
    console.log(data.value.length);
    return res.json({ news: data });
  } catch (error) {
    return res.json({ error: error.message }, { status: 500 });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`, "SUCCESS");
});
