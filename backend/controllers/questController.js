const Quest = require("../models/Quest");
const User = require("../models/User");
const {
  awardXP,
  calculateLevel,updateStreak,unlockBadges,
} = require("../services/gameService");
// @desc    Create a new quest
// @route   POST /api/quests
// @access  Private
const createQuest = async (req, res) => {
  try {
    const { title, description, xpReward } = req.body;

    const quest = await Quest.create({
      user: req.user._id,
      title,
      description,
      xpReward,
    });

    res.status(201).json({
      success: true,
      message: "Quest created successfully",
      quest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc    Get all quests of logged-in user
// @route   GET /api/quests
// @access  Private
const getMyQuests = async (req, res) => {
  try {
    const quests = await Quest.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      count: quests.length,
      quests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc    Update a quest
// @route   PUT /api/quests/:id
// @access  Private
const updateQuest = async (req, res) => {
  try {
    const quest = await Quest.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    quest.title = req.body.title || quest.title;
    quest.description = req.body.description || quest.description;
    quest.xpReward = req.body.xpReward || quest.xpReward;

    const updatedQuest = await quest.save();

    res.status(200).json({
      success: true,
      message: "Quest updated successfully",
      quest: updatedQuest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// @desc    Complete a quest
// @route   PATCH /api/quests/:id/complete
// @access  Private
const completeQuest = async (req, res) => {
  try {
    const quest = await Quest.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!quest) {
      return res.status(404).json({
        success: false,
        message: "Quest not found",
      });
    }

    if (quest.completed) {
      return res.status(400).json({
        success: false,
        message: "Quest is already completed",
      });
    }

   quest.completed = true;
quest.completedAt = new Date();

await quest.save();

// Update user's XP
const user = await User.findById(req.user._id);

awardXP(user, quest.xpReward);

calculateLevel(user);
updateStreak(user);
await unlockBadges(user);
await user.save();

res.status(200).json({
  success: true,
  message: "Quest completed successfully",
  quest,
  xp: user.xp,
  level: user.level,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createQuest,getMyQuests,updateQuest,completeQuest,
};