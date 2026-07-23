const express = require('express');
const app = express();

app.use(express.json());

let tasks = [
    {id: 1, title: "Take a Bath", done: true},
    {id: 2, title: "Exercise", done: true},
    {id: 3, title: "Practice coding", done: false}
];

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

app.post('/tasks', (req, res) => {
    const newTitle = req.body.title;

    if (!newTitle) {
        return res.status(400).json({ error: "Bad Input"});
    }

    let newElement = { id: tasks.length + 1, title: newTitle, done: false };

    tasks.push(newElement);

    res.status(201).json(tasks);
})



app.listen(3000, () => console.log("Server is up and running!"));