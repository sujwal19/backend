let todos = [];

// 7️⃣ models/todoModel.js – In-Memory Data
// Purpose: Store & manipulate data

// todos = []  // in-memory
// getAllTodos() → return todos
// getTodoById(id) → find in todos
// createTodo(todo) → push to todos
// updateTodo(id, data) → merge object in todos
// deleteTodo(id) → filter todos

export const getAllTodos = () => todos;

export const getTodoById = (id) => todos.find((t) => t.id === id);

export const createTodo = (todo) => todos.push(todo);

export const updateMark = (completed) => {
  todos = todos.map((t) => ({ ...t, completed }));
};

export const updateTodo = (id, data) => {
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1)
    todos[index] = {
      ...todos[index],
      ...data,
    };
};

export const deleteTodo = (id) => {
  todos = todos.filter((t) => t.id !== id);
};
