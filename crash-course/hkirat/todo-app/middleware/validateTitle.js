export function validateTitle(req, res, next) {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }
  next();
}
