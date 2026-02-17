const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/userController");

// Only admin can list all users
router.get("/", authMiddleware, authorize(["admin"]), getAllUsers);

// Get profile by ID (self or admin)
router.get("/:id", authMiddleware, getUserById);

// Update user info (self or admin)
router.put("/:id", authMiddleware, updateUser);

module.exports = router;
