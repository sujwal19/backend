const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../middleware/authMiddleware");

const Workspace = require("../models/Workspace");

router.use(protect);

// Create a workspace
// only admin can access specific route
router.post("/", restrictTo("admin"), async (req, res) => {
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

const Invitation = require("../models/Invitation");
const User = require("../models/User");

// Member joins workspace via invite token
router.get("/join/:token", async (req, res) => {
  try {
    const token = req.params.token;

    // 1️⃣ Find invitation
    const invite = await Invitation.findOne({ token });
    if (!invite) return res.status(400).json({ error: "Invalid invite token" });

    // 2️⃣ Find the logged-in user
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ error: "User not found" });

    // 3️⃣ Find workspace
    const workspace = await Workspace.findById(invite.workspace);
    if (!workspace)
      return res.status(400).json({ error: "Workspace not found" });

    // 4️⃣ Add member if not already
    if (!workspace.members.includes(user._id)) {
      workspace.members.push(user._id);
      await workspace.save();
    }

    // 5️⃣ Delete invitation
    await Invitation.deleteOne({ _id: invite._id });

    res.json({ message: "Joined workspace successfully", workspace });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
