export function checkPostExist(posts) {
  return (req, res, next) => {
    let id = parseInt(req.params.id);
    let post = posts.find((p) => p.id === id);

    if (!post) return res.status(404).json({ error: "Post not Found" });
    next();
  };
}
