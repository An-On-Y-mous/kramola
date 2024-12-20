import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URL,
});

export const POST = async (req: Request) => {
  try {
    const data = await req.json();
    var { slugtitle, locale } = data;

    if (!locale) locale = "en";

    if (!slugtitle || !locale) {
      return new Response(
        JSON.stringify({
          error: "Slugtitle and locale are required",
        }),
        { status: 400 }
      );
    }

    const query = `
      SELECT 
        n.id, 
        nt.slugtitle, 
        n.date, 
        n.source_url, 
        n.img_url,
        nt.title,
        nt.description
      FROM 
        news n
      JOIN 
        news_translations nt ON n.id = nt.news_id
      WHERE 
        nt.slugtitle = $1 AND nt.locale = $2
    `;

    const client = await pool.connect();
    try {
      const result = await client.query(query, [slugtitle, locale]);

      if (result.rows.length === 0) {
        return new Response(
          JSON.stringify({
            error: "No news item found with the given slugtitle and locale",
          }),
          { status: 404 }
        );
      }

      return new Response(
        JSON.stringify({
          message: "success",
          newsItem: result.rows[0],
        })
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500 }
    );
  }
};
