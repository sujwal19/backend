const express = require("express");
const router = express.Router();

const User = require("../models/User");

// Create user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find().limit(10).skip(0);
  res.json(users);
});

module.exports = router;
