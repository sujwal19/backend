import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import singleUpload from "./singleUpload.js";
import "colors";
dotenv.config();
const app = express();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "mini-marketplace",
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold,
    );
  } catch (err) {
    console.log(`Error: ${err.message}`.red);
    process.exit(1);
  }
};

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use("/uploads", express.static("uploads"));

app.use("/api/single", singleUpload);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
