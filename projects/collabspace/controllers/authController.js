const User = require("../models/User");
const sendEmail = require("../utils/email");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    // Hash their password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Save user with verification token and isVerified
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || "member",
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    const verificationUrl = `${process.env.API_URL}/api/auth/verify/${verificationToken}`;

    await sendEmail(
      user.email,
      "Verify Your Email",
      `<p>Click <a href="${verificationUrl}">here</a> to verify your account</p>`,
    );
    console.log("Verification token:", verificationToken);

    // Return a success message
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(400).json({ error: "User not found" });

    // If email not found, return error
    if (!user.isVerified) {
      return res
        .status(400)
        .json({ error: "Please verify your email before logging in." });
    }
    // Compare entered password with hashed password using bcrypt
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
