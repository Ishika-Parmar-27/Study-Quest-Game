const { protect } = require("../middleware/authMiddleware");
const express = require("express");
const {
  registerUser,
  loginUser,getUserProfile,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;