let todos = [];

export const getAllTodos = () => todos;
export const getTodoById = (id) => todos.find((t) => t.id === id);
export const createTodo = (todo) => todos.push(todo);
export const updateTodo = (id, data) => {
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) todos[index] = { ...todos[index], ...data };
};
export const deleteTodo = (id) => {
  todos = todos.filter((t) => t.id !== id);
};
