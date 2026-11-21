const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const titles = ["Take a bath", "Exercise", "Practice Coding"];

async function init() {
    await pool.query("CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, title TEXT NOT NULL UNIQUE, done BOOLEAN NOT NULL DEFAULT false)");
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

async function createTask(title, done) {
  const result = await pool.query("INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *", [title, done]);
  return result.rows[0];
}

async function updateTask(id, title, done) {
  if (Number.isInteger(id) && id >= 0){
    return null;
  }

  const result = await pool.query("UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *", [title, done, id]);

  if (result.rowCount !== 0 ){
    return result.rows[0];
  } else {
    return null;
  }
}

async function deleteTask(id) {
  if (Number.isInteger(id) && id >= 0){
    return false;
  }

  const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  
  if (result.rowCount > 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = { init, getAll, getById, createTask, updateTask, deleteTask };