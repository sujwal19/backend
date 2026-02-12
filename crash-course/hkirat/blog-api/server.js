import express from "express";
const app = express();
app.use(express.json());

let posts = [];

app.use("/", (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/posts", (req, res) => {
  const { title, comments } = req.body;

  let createPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    comments: (comments || []).map((c, index) => ({
      id: index + 1,
      content: c.content,
    })),
  };
  posts.push(createPost);
  res.status(201).json(createPost);
});

app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  res.json(post);
});

app.put("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);
  const { title, comments } = req.body;

  if (title) post.title = title;

  if (comments) {
    post.comments = comments.map((c, index) => ({
      id: index + 1,
      content: c.content,
    }));
  }
  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  posts = posts.filter((p) => p.id !== id);
  res.send("Post Deleted");
});

app.delete("/posts/:postId/:commentId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);

  const post = posts.find((p) => p.id === postId);

  post.comments = post.comments.filter((c) => c.id !== commentId);
  res.send("Comment Deleted");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
