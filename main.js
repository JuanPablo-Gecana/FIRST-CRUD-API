require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openapi.json');
const app = express();
const db = require('./tasks.js');

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/tasks', async (req, res) => {
  try {
    const rows = await db.getAll();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get('/', (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
})

app.get('/health', (req, res) => {
    res.json({ "status": "ok"});
})

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await db.getById(req.params.id);

    if (!task){
        return res.status(404).json({ error: "Task not found"});
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { title, done } = req.body ?? {};

    if (typeof title !== "string" || !title.trim()){
        return res.status(400).json({ error: "Bad Input "});
    }

    if (done !== undefined && typeof done !== "boolean"){
        return res.status(400).json({ error: "Bad Input "});
    }

    const task = await db.createTask(title.trim(), done ?? false);
    return res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { title, done } = req.body ?? {};

    if (!title){
        res.status(400).json({ error: "Invalid Input"});
    }

    if (done !== undefined && typeof done !== "boolean"){
        done = false;
    } else if (typeof done !== "boolean"){
        return res.status(400).json({ error: "Invalid Input"});
    }

    const task = await db.updateTask(req.params.id, title.trim(), done ?? false);

    if (!task){
        res.status(404).json({ error: "Task not Found"});
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const deleted = await db.deleteTask(req.params.id);
    if (!deleted){
        res.status(404).json({ error: "Task not found"});
    }

    res.status(204).send()
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

async function start() {
    await db.init();
    app.listen(3000, () => console.log("Server is up and running!"));
}

start().catch((error) =>  {
    console.error("Failed to start.", error);
    process.exit(1);
});