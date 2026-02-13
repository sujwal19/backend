import express from "express";
import Post from "../models/Post.js";
import { validateObjectIds } from "../middleware/validateObjectId.js";
const router = express.Router();

// GET all posts
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find().lean();
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// POST a post
router.post("/", async (req, res, next) => {
  try {
    const { title, comments } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const post = await Post.create({ title, comments });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// GET single post
router.get("/:id", validateObjectIds(["id"]), async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    next(err);
  }
});

// GET single post's comment
router.get(
  "/:postId/comments/:commentId",
  validateObjectIds(["postId", "commentId"]),
  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: "Post not found" });

      const comment = post.comments.id(req.params.commentId);

      if (!comment) return res.status(404).json({ error: "Comment not found" });

      res.json(comment);
    } catch (error) {
      next(error);
    }
  },
);

// PATCH update post
router.patch("/:id", validateObjectIds(["id"]), async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    next(err);
  }
});

// DELETE post
router.delete("/:id", validateObjectIds(["id"]), async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// DELETE comment
router.delete(
  "/:postId/comments/:commentId",
  validateObjectIds(["postId", "commentId"]),
  async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) return res.status(404).json({ error: "Post not found" });

      const comment = post.comments.id(req.params.commentId);
      if (!comment) return res.status(404).json({ error: "Comment not found" });

      comment.deleteOne(); // remove subdocument
      await post.save(); // save parent document

      res.json({ message: "Comment deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
