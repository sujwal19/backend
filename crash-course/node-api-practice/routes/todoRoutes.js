import * as TodoController from "../controllers/todoController.js";

// 4️⃣ routes/todoRoutes.js – Manual Routing
// Purpose: Map HTTP path + method → controller

// parse path & method
//   ├─ GET /api/todos → controller.getTodos()
//   ├─ POST /api/todos → controller.addTodo()
//   ├─ GET /api/todos/:id → controller.getTodo(id)
//   ├─ PUT /api/todos/:id → controller.editTodo(id)
//   ├─ DELETE /api/todos/:id → controller.removeTodo(id)
//   └─ else → 404

export const todoRoutes = async (req, res, parsedUrl, query) => {
  const path = parsedUrl.pathname;
  const method = req.method;

  // GET /api/todos
  if (path === "/api/todos" && method === "GET") {
    return TodoController.getTodos(req, res, query);
  }

  // POST /api/todos
  if (path === "/api/todos" && method === "POST") {
    return TodoController.addTodo(req, res);
  }

  if (path === "/api/todos/mark-all" && method === "PUT") {
    return TodoController.updateMark(req, res, query);
  }

  if (path.startsWith("/api/todos/")) {
    // Routes with ID
    const id = path.split("/")[3];

    if (method === "GET") return TodoController.getTodo(req, res, id);

    if (method === "PUT") return TodoController.editTodo(req, res, id);

    if (method === "DELETE") return TodoController.removeTodo(req, res, id);
  }

  // 404
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
};
