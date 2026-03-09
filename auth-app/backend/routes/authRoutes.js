const express = require("express");
const router = express.Router();
const {
  signupValidation,
  loginValidation,
} = require("../middleware/authValidation");
const { signup, login } = require("../controllers/authController");

router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);

module.exports = router;
