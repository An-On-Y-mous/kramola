import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URL,
});

export const GET = async (
  request: Request,
  context: { params: { id: string } }
) => {
  const { id } = await context.params;
  const { rows } = await pool.query("SELECT * FROM news WHERE id = $1", [id]);
  return new Response(JSON.stringify(rows[0]), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
