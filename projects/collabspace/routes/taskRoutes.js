const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { protect, restrictTo } = require("../middleware/authMiddleware");

// Create task - only project members
router.post("/", protect, async (req, res) => {
  try {
    const { project: projectId } = req.body;
    const project = await require("../models/Project").findById(projectId);

    if (!project) return res.status(400).json({ error: "Project not found" });

    if (!project.members.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not a member of this project" });
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get tasks assigned to logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id }).populate(
      "assignedTo project",
      "name email title",
    );
    res.json({ tasks });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get tasks for a project - only project members
router.get("/project/:projectId", protect, async (req, res) => {
  try {
    const project = await require("../models/Project").findById(
      req.params.projectId,
    );

    if (!project) return res.status(404).json({ error: "Project not found" });

    // Only members or admin
    if (!project.members.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not a member of this project" });
    }

    const tasks = await Task.find({ project: req.params.projectId }).populate(
      "assignedTo",
      "name email",
    );
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update task status - only assigned user or admin
router.put("/:taskId", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (
      task.assignedTo.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not allowed" });
    }

    task.status = req.body.status || task.status;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
