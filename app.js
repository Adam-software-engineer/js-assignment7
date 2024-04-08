const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const todos = [
  { id: 1, item: "Learn JavaScript", complete: false },
  { id: 2, item: "Learn Express", complete: false },
  { id: 3, item: "Build a To Do App", complete: false },
];

// GET /api/todos

app.get("/api/todos", (_, response) => {
  response.json(todos);
});

// POST /api/todos

app.post("/api/todos", (request, response) => {
  const NewSet = request.body;
  NewSet.id = todos.length + 1;
  todos.push(NewSet);
  response.status(201).json({ id: NewSet.id });
});

// PUT /api/todos/:id

app.put("/api/todos/:id", (request, response) => {
  const { id } = request.params;
  const task = todos.find((todo) => todo.id.toString() === id);

  if (!task) {
    return response.status(404).json({ error: "can't find tasks" });
  }

  task.complete = !task.complete; // toggle the complete property
  response.json({ id: task.id, complete: task.complete });
});

const message = `Server running: http://localhost:${port}`;
app.listen(port, () => console.log(message));
