const Workspace = require("../models/Workspace");

exports.createWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.create(req.body);
    res.status(201).json(workspace);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find().populate("members", "-password");
    res.json(workspaces);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
