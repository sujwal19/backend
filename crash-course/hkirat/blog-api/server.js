import express from "express";
import { connectDB } from "./db.js";
import postsRouter from "./routes/posts.js";
import { globalErrorHandler } from "./errors/globalErrorHandler.js";
import { notFoundHandler } from "./errors/notFoundHandler.js";

const app = express();
app.use(express.json());

await connectDB();

// Logger Middleware
app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Use route
app.use("/posts", postsRouter);
app.get("/", (req, res) => res.send("Hello World!"));

app.use(notFoundHandler);
app.use(globalErrorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
