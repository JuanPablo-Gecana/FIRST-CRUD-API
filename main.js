require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const app = express();
const db = require('./tasks.js');

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let tasks = [
    {id: 1, title: "Take a Bath", done: true},
    {id: 2, title: "Exercise", done: true},
    {id: 3, title: "Practice coding", done: false}
];

app.get('/tasks', (req, res) => {
    const getAll = db.prepare('SELECT * FROM tasks').all();
    const rows = JSON.stringify(getAll);
    res.json(rows);
});

app.get('/', (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
})

app.get('/health', (req, res) => {
    res.json({ "status": "ok"});
})

app.get('/tasks/:id', (req, res) => {
    const getItem = db.prepare('SELECT * FROM tasks WHERE id = ?').get(req.params.id);
    const rows = JSON.stringify(getItem);

    if (!getItem)
       return res.status(404).json({ error: "Task not found" });
     
    res.json(rows);
})

app.post('/tasks', (req, res) => {
    const newTitle = req.body.title;

    if (!newTitle) {
        return res.status(400).json({ error: "Bad Input"});
    }

    const insert = db.prepare(`INSERT INTO tasks (title, done) VALUES (?, ?) ON CONFLICT(title) DO NOTHING`);
    insert.run(JSON.stringify(newTitle), 0);

    const getAll = db.prepare('SELECT * FROM tasks').all();
    const rows = JSON.stringify(getAll);
    res.json(rows);
})

app.put('/tasks/:id', (req, res) => {
    const taskNo = req.params.id;
    const taskElem = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskNo);

    if (!taskElem) 
        return res.status(404).json({ error: "ID doesnt exist."});
    else if (!taskElem.title)
        return res.status(400).json({ error: "Invalid Input"});

    const setup = db.prepare(`UPDATE tasks SET title = ?, done = ? WHERE id = ?`);
    const update = setup.run(JSON.stringify(req.body.title), JSON.stringify(req.body.done), taskNo);

    const getAll = db.prepare('SELECT * FROM tasks').all();
    const uptasks = JSON.stringify(getAll);
    res.json(uptasks);
})

app.delete('/tasks/:id', (req, res) => {
    const numToDel = req.params.id;
    const taskToDel = db.prepare('SELECT * FROM tasks WHERE id = ?').get(numToDel);

    if (!taskToDel)
        return res.status(404).json({error: "Unknown ID"});

    const del = db.prepare(`DELETE FROM tasks WHERE id = ?`).run(numToDel);

    res.status(204).send();
})

async function start() {
    await db.init();
    app.listen(3000, () => console.log("Server is up and running!"));
}

start().catch((error) =>  {
    console.error("Failed to start.", error);
    process.exit(1);
});