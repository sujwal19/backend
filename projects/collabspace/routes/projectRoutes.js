const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// Create project - only admin
router.post("/", protect, restrictTo("admin"), async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      workspace: req.body.workspace,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get projects in a workspace
router.get("/workspace/:id", protect, async (req, res) => {
  try {
    const projects = await Project.find({
      workspace: req.params.id,
    }).populate("members");

    res.json(projects);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
