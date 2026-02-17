const router = require("express").Router();
const { signup, login, verifyEmail } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);

module.exports = router;
