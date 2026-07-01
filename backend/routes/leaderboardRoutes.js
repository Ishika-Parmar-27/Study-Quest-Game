const express = require("express");
const getLeaderboard = require("../controllers/leaderboardController");
const protectMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protectMiddleware.protect, getLeaderboard);

module.exports = router;