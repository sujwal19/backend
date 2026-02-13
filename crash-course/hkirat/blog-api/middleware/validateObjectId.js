import mongoose from "mongoose";

export const validateObjectIds = (paramNames = []) => {
  return (req, res, next) => {
    for (let name of paramNames) {
      if (
        req.params[name] &&
        !mongoose.Types.ObjectId.isValid(req.params[name])
      ) {
        return res.status(400).json({ error: `Invalid ID: ${name}` });
      }
    }
    next();
  };
};
