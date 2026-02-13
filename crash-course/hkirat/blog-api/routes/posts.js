import express from "express";
import { validateTitle } from "../middleware/validateTitle.js";
import { checkPostExist } from "../middleware/checkPostExist.js";
import { checkCommentExist } from "../middleware/checkCommentExist.js";
const router = express.Router();

let posts = [];

// GET all posts
router.get("/", (req, res) => {
  res.json(posts);
});

// POST a post
router.post("/", validateTitle, (req, res) => {
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

// GET single post
router.get("/:id", checkPostExist(posts), (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((p) => p.id === id);

  res.json(post);
});

// GET single post's comment
router.get("/:postId/:commentId", checkCommentExist(posts), (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);

  const post = posts.find((p) => p.id === postId);
  const comment = post.comments.find((c) => c.id === commentId);
  res.json(comment);
});

// PUT update post or comment
router.put("/:id", checkPostExist(posts), (req, res) => {
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

// DELETE post
router.delete("/:id", checkPostExist(posts), (req, res) => {
  const id = parseInt(req.params.id);

  posts = posts.filter((p) => p.id !== id);
  res.send("Post Deleted");
});

// DELETE comment
router.delete("/:postId/:commentId", checkCommentExist(posts), (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);
  const post = posts.find((p) => p.id === postId);

  const commentIndex = post.comments.findIndex((c) => c.id === commentId);
  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }
  post.comments.splice(commentIndex, 1);
  res.json({ message: "Comment deleted successfully" });
});

export default router;
