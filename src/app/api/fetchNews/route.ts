import { Pool } from "pg";
import { NextResponse } from "next/server";

const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URL,
});

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  const { rows: news } = await pool.query("SELECT * FROM news");

  const { rows: translations } = await pool.query(
    "SELECT * FROM news_translations WHERE locale = $1",
    [locale]
  );

  const result = news.map((newsItem) => {
    const translation = translations.find((t) => t.news_id === newsItem.id);
    return {
      ...newsItem,
      title: translation?.title || "No title available",
      description: translation?.description || "No description available",
      slugTitle: translation?.slugTitle || newsItem.slugTitle,
    };
  });

  return new NextResponse(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
