import express from "express";
import path from "path";
import posts from "./routes/posts.js";
const PORT = process.env.PORT || 8000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setup static folder
// app.use(express.static(path.join(__dirname, "public")));
// same as above
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// Routes
app.use("/api/posts", posts);

app.listen(PORT, () => console.log("Server running on port ", PORT));
