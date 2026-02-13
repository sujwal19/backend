import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    comments: [commentSchema],
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;
