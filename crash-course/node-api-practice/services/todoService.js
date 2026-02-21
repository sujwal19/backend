import { generateId } from "../utils/generateId";
import * as Todo from "../models/todoModel";

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
