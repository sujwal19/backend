const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // Hash their password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Return a success message
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // If email not found, return error
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Compare entered password with hashed bassword using bcrypt
    const match = await bcrypt.compare(password, user.password);

    // If not match, return error
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    // Create JWT token with user ID & role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // Send token back to user
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
