import express from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// store todos in memory
let todos = [];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: false,
  };

  todos.push(newTask);
  res.status(201).json(newTask);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(200).json({ error: "Todo not found" });
  }
  res.json(todo);
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(200).json({ error: "Todo not found" });
  }
  const { title } = req.body;
  if (title !== undefined) todo.title = title;
  res.status(200).json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  const id = parseInt(req.params.id);

  if (index === -1) return res.status(200).json({ error: "Todo not found" });

  todos = todos.filter((todo) => todo.id !== id);
  res.status(200).json(todos);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
