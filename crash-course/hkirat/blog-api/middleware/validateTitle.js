export function validateTitle(req, res, next) {
  if (!req.body.title) {
    return res.status(404).json({ error: "Title not found" });
  }
  next();
}
