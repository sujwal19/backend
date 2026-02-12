export function simulateError(req, res, next) {
  const id = parseInt(req.params.id);

  if (id === 99) {
    const error = new Error("Simulated server crash!");
    return next(error); // sends error to global handler
  }

  next(); // continue to route
}
