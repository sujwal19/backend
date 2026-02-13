export function checkCommentExist(posts) {
  return (req, res, next) => {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);

    const post = posts.find((p) => p.id === postId);
    if (!post) return res.status(404).json({ error: "Post not Found" });

    const comment = post.comments.find((c) => c.id === commentId);
    if (!comment) return res.status(404).json({ error: "Comment not Found" });
    next();
  };
}
