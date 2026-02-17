const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");
const {
  createWorkspace,
  getWorkspaces,
} = require("../controllers/workspaceController");

router.post("/", authMiddleware, authorize(["admin"]), createWorkspace);
router.get("/", authMiddleware, getWorkspaces);

module.exports = router;
