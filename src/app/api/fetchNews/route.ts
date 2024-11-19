import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URL,
});

export const GET = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM news");

    return new Response(JSON.stringify(rows), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }
};
