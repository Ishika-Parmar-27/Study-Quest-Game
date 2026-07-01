const User = require("../models/User");
const Quest = require("../models/Quest");

// @desc    Get Dashboard Data
// @route   GET /api/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    const totalQuests = await Quest.countDocuments({
  user: req.user._id,
});

const completedQuests = await Quest.countDocuments({
  user: req.user._id,
  completed: true,
});

const pendingQuests = await Quest.countDocuments({
  user: req.user._id,
  completed: false,
});
res.status(200).json({
  success: true,
  dashboard: {
    user: {
      name: user.name,
      email: user.email,
      xp: user.xp,
      level: user.level,
      streak: user.streak,
      badges: user.badges,
    },
    stats: {
      totalQuests,
      completedQuests,
      pendingQuests,
    },
  },
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};  