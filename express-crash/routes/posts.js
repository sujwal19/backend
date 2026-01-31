import express from "express";
const router = express.Router();
//
let posts = [
  { id: 0, title: "Node js" },
  { id: 1, title: "Express" },
  { id: 2, title: "Middleware" },
  { id: 3, title: "MongoDB" },
];

// Get all Posts
router.get("/", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

// Get Single Posts
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res
      .status(404)
      .json({ message: `Post with id of ${id} not found.` });
  }
  res.status(200).json(post);
});

// Create new post
router.post("/", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };

  if (!newPost.title) {
    return res.status(400).json({ message: "Please include a title" });
  }
  posts.push(newPost);
  res.status(201).json(posts);
});

export default router;
