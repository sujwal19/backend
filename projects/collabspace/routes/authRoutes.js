const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const User = require("../models/User");
const Invitation = require("../models/Invitation");
const { protect, restrictTo } = require("../middleware/authMiddleware");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

router.post("/signup", signup);
router.post("/login", login);

router.get("/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).send("Invalid token");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: "Email verified! You can now login." });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/invite", protect, restrictTo("admin"), async (req, res) => {
  const { email, workspaceId } = req.body;

  if (!email || !workspaceId) {
    return res
      .status(400)
      .json({ error: "Email and workspaceId are required" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  await Invitation.create({ email, workspace: workspaceId, token });

  const inviteUrl = `${process.env.CLIENT_URL}/join/${token}`;

  await sendEmail(
    email,
    "Workspace Invite",
    `<a href="${inviteUrl}">Join Workspace</a>`,
  );
  console.log("Invite URL:", inviteUrl);
  res.json({ message: "Invitation sent!" });
});

router.post("/forgot-password", async (req, res) => {
  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user) return res.status(400).send("User not found");

  const token = crypto.randomBytes(32).toString("hex");
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await sendEmail(
    user.email,
    "Reset Password",
    `<a href="${resetUrl}">Reset</a>`,
  );

  res.json({ message: "Password reset email sent" });
});

router.post("/reset-password/:token", async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).send("Invalid or expired token");

  user.password = await bcrypt.hash(req.body.password, 12);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
});

console.log("signup:", signup);
console.log("login:", login);
console.log("protect:", protect);
console.log("restrictTo:", restrictTo);

module.exports = router;
