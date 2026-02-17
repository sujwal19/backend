const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

router.post("/", authMiddleware, authorize(["admin"]), createProject);
router.get("/", authMiddleware, getProjects);

module.exports = router;
