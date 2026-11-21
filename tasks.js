const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const titles = ["Take a bath", "Exercise", "Practice Coding"];

async function init() {
    await pool.query("CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, title TEXT NOT NULL, done BOOLEAN NOT NULL DEFAULT false)");
    const result = await pool.query("SELECT COUNT(*) FROM tasks"); 

    if (Number(result.rows[0].count) === 0){
      for (const title of titles){
        await pool.query("INSERT INTO tasks (title) VALUES ($1)", [title]);
      }
    }
};

async function getAll() {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id");
  return result.rows;
}

async function getById(id) {
  if (!Number.isInteger(Number(id))){
    return null;
  }

  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return result.rows[0];
}

// Update the export at the bottom of the file:
module.exports = { init, getAll, getById };