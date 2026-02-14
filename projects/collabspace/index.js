const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Import Routes
const userRoutes = require("./routes/userRoutes");
const workspaceRoutes = require("./routes/workspaceRoutes");

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/workspaces", workspaceRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Mongo connection error:", err));

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server runnning on ${PORT}`);
});
