const express = require("express");
const router = express.Router();

const Workspace = require("../models/Workspace");

// Create a workspace
router.post("/", async (req, res) => {
  try {
    const ws = await Workspace.create(req.body);
    res.status(200).json(ws);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all workspaces
router.get("/", async (req, res) => {
  const workspaces = await Workspace.find().populate("members");
  res.json(workspaces);
});

module.exports = router;
