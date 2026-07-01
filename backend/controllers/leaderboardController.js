const User = require("../models/User");

const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find()
      .select("name xp level streak badges")
      .sort({ xp: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leaderboard",
      error: error.message,
    });
  }
};

module.exports = getLeaderboard;