const express = require("express");
const getWeeklyAnalytics = require("../controllers/analyticsController");
const protectMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/weekly", protectMiddleware.protect, getWeeklyAnalytics);

module.exports = router;