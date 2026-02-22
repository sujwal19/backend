import * as TodoService from "../services/todoService.js";

// 5️⃣ controllers/todoController.js – Handle HTTP Request/Response

// Purpose: Handle HTTP layer, parse body, send response

// Flow per function:

// Function	Flow
// getTodos(req, res, query)	call service.getTodos() → filter query → send JSON
// getTodo(req, res, id)	call service.getTodo(id) → if null throw 404 → send JSON
// addTodo(req, res)	read req body → parse JSON → call service.addTodo() → send JSON
// editTodo(req, res, id)	read req body → parse JSON → call service.editTodo(id, data) → send JSON
// removeTodo(req, res, id)	call service.removeTodo(id) → if null throw 404 → send message

export const getTodos = (req, res, query) => {
  let todos = TodoService.getTodos();

  // Query filtering
  if (query.completed) {
    const completed = query.completed === "true";
    todos = todos.filter((t) => t.completed === completed);
  }

  if (query.limit) {
    todos = todos.slice(0, Number(query.limit));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(todos));
};

export const getTodo = (req, res, id) => {
  const todo = TodoService.getTodo(id);

  if (!todo) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Todo not found" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(todo));
};

export const addTodo = (req, res) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk));

  req.on("end", () => {
    const data = JSON.parse(body);
    const todo = TodoService.addTodo(data);

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todo));
  });
};

export const editTodo = (req, res, id) => {
  let body = "";

  req.on("data", (chunk) => (body += chunk));

  req.on("end", () => {
    const data = JSON.parse(body);
    const todo = TodoService.editTodo(id, data);

    if (!todo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Todo not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todo));
  });
};

export const removeTodo = (req, res, id) => {
  const todo = TodoService.removeTodo(id);

  if (!todo) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ message: "Todo not found" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Deleted successfully" }));
};

export const updateMark = (req, res, query) => {
  const completed = query.completed === "true";

  const todos = TodoService.updateMark(completed);

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(todos));
};
