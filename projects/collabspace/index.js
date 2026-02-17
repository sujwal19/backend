const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo connection error:", err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`),
);
