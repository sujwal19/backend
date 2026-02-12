import express from "express";
import todosRouter from "./routes/todos.js";
import { globalErrorHandler } from "./errors/globalErrorHandler.js";
import { notFoundHandler } from "./errors/notFoundHandler.js";

const app = express();
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use route
app.use("/todos", todosRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Catch-all 404 handler (should be after all routes)
app.use(notFoundHandler);

// Global Error Handler (should be last)
app.use(globalErrorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
