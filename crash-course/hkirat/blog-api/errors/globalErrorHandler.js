export function globalErrorHandler(err, req, res, next) {
  console.error("Error caught by global handler", err.message);

  res.status(500).json({ error: err.message || "Something went wrong! " });
}
