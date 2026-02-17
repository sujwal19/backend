const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const { createTask, getTasks } = require("../controllers/taskController");

router.post("/", authMiddleware, authorize(["admin", "member"]), createTask);
router.get("/", authMiddleware, getTasks);

module.exports = router;
