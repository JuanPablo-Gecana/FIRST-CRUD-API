const express = require('express');
const app = express();

let tasks = [
    {id: 1, title: "Take a Bath", done: true},
    {id: 2, title: "Exercise", done: true},
    {id: 3, title: "Practice coding", done: false}
]

app.get('/tasks', (req, res) => {
    res.json(tasks);
})

app.get('/', (req, res) => {
    res.json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
})

app.get('/health', (req, res) => {
    res.json({ "status": "ok"});
})

app.get('/tasks/:id', (req, res) => {
    const taskNum = req.params.id;
    const taskItem = tasks.find(i => i.id == taskNum);

    if (!taskItem)
       return res.status(404).json({ error: "Task 99 not found" });

    res.json(taskItem);
})

app.listen(3000);