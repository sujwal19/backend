import { generateId } from "../utils/generateId.js";
import * as Todo from "../models/todoModel.js";

// 6️⃣ services/todoService.js – Business Logic
// Purpose: Connect controller → model, implement logic

// getTodos() → model.getAllTodos()
// getTodo(id) → model.getTodoById(id)
// addTodo(data)
//   ├─ generateId()
//   ├─ create todo object
//   └─ model.createTodo(todo)
// editTodo(id, data) → model.updateTodo(id, data) → model.getTodoById(id)
// removeTodo(id) → model.getTodoById(id) → model.deleteTodo(id)

export const getTodos = () => Todo.getAllTodos();
export const getTodo = (id) => Todo.getTodoById(id);

export const addTodo = (data) => {
  const todo = { id: generateId(), ...data };
  Todo.createTodo(todo);
  return todo;
};

export const editTodo = (id, data) => {
  Todo.updateTodo(id, data);
  return Todo.getTodoById(id);
};

export const removeTodo = (id) => {
  const todo = Todo.getTodoById(id);
  Todo.deleteTodo(id);
  return todo;
};

export const updateMark = (completed) => {
  Todo.updateMark(completed);
  return Todo.getAllTodos();
};
