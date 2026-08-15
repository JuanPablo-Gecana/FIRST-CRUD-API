const Database = require('better-sqlite3');
const db = new Database('./tasks.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title TEXT NOT NULL UNIQUE,
        done BOOLEAN NOT NULL DEFAULT 0
    )`
);

const input = db.prepare(`INSERT OR IGNORE INTO tasks (title) VALUES (?)`);

const insertTask = db.transaction((tasksArray) => {
    for (const task of tasksArray) {
        input.run(task.title);
    }
});

insertTask([
    { title: 'Take a Bath' },
    { title: 'Exercise' },
    { title: 'Practice coding' }
])

module.exports = db;