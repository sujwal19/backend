const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if request has Authorization header with Bearer <token>.
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "No token providede" });

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token with JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to req.user
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ error: "Token invalid" });
  }
};

// Restrict to roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Only allow users with certain roles.
    if (!roles.includes(req.user.role))
      return res.status(403).json({ error: "You do not have permission" });
    next();
  };
};
