const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/email");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await sendEmail(
      email,
      "Verify your account",
      `Click link to verify: http://localhost:5000/api/auth/verify/${token}`,
    );

    res
      .status(201)
      .json({ message: "User created, check email for verification" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (!user.verified)
      return res.status(400).json({ message: "Email not verified" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });
    user.verified = true;
    await user.save();
    res.json({ message: "Email verified!" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
