const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// Create project - only admin
router.post("/", protect, restrictTo("admin"), async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get projects in a workspace
router.get("/workspace/:workspaceId", protect, async (req, res) => {
  try {
    const projects = await Project.find({
      workspace: req.params.workspaceId,
    }).populate("members", "name email");

    res.json(projects);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
