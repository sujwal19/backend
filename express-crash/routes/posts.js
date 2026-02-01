import express from "express";
const router = express.Router();
import {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
//

// Get all Posts
router.get("/", getPosts);

// Get Single Posts
router.get("/:id", getSinglePost);

// Create new post
router.post("/", createPost);

// Update Post
router.put("/:id", updatePost);

// Delete Post
router.delete("/:id", deletePost);

export default router;
