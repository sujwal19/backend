import express from "express";
import { validateTitle } from "../middleware/validateTitle.js";
import { checkTodoExist } from "../middleware/checkTodoExist.js";
import { simulateError } from "../middleware/simulateError.js";
const router = express.Router();

let todos = []; // local to router

// GET all todos
router.get("/", (req, res) => {
  res.json(todos);
});

// POST a todo
router.post("/", validateTitle, (req, res) => {
  const { title } = req.body;

  const newTask = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    title,
    completed: false,
  };

  todos.push(newTask);
  res.status(201).json(newTask);
});

// GET single todo
router.get("/:id", simulateError, checkTodoExist(todos), (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));

  res.json(todo);
});

// PUT update todo
router.put("/:id", simulateError, checkTodoExist(todos), (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));

  const { title } = req.body;
  if (title !== undefined) todo.title = title;

  res.status(200).json(todo);
});

// DELETE todo
router.delete("/:id", simulateError, checkTodoExist(todos), (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  todos = todos.filter((todo) => todo.id !== id);
  res.status(200).json(todo);
});

export default router;
