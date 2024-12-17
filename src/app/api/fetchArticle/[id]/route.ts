import { Pool } from "pg";
import { NextResponse } from "next/server";

const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URL,
});

export const GET = async (
  request: Request,
  context: { params: { slugTitle: string } }
) => {
  const { slugTitle } = context.params;
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") || "en";

  try {
    const { rows: news } = await pool.query(
      "SELECT * FROM news WHERE id = (SELECT news_id FROM news_translations WHERE slugTitle = $1 AND locale = $2)",
      [slugTitle, locale]
    );

    if (news.length > 0) {
      const { rows: translations } = await pool.query(
        "SELECT * FROM news_translations WHERE news_id = $1 AND locale = $2",
        [news[0].id, locale]
      );

      return new NextResponse(JSON.stringify(translations[0] || news[0]), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse("Article not found", { status: 404 });
  } catch (error) {
    console.error("Error fetching article:", error);
    return new NextResponse("Failed to fetch article", { status: 500 });
  }
};
