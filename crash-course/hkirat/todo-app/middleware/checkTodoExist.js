export function checkTodoExist(todos) {
  return (req, res, next) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).json({
        error: "Todo not Found.",
      });
    }
    next();
  };
}
