const Quest = require("../models/Quest");
const awardXP = async (user, xpReward) => {
  user.xp += xpReward;
};
const calculateLevel = (user) => {
  user.level = Math.floor(user.xp / 100) + 1;
};
const updateStreak = (user) => {
  const today = new Date();

  // First quest ever completed
  if (!user.lastCompletedDate) {
    user.streak = 1;
    user.lastCompletedDate = today;
    return;
  }

  const lastDate = new Date(user.lastCompletedDate);

  // Remove time part from both dates
  today.setHours(0, 0, 0, 0);
  lastDate.setHours(0, 0, 0, 0);

  const diffInDays = (today - lastDate) / (1000 * 60 * 60 * 24);

  if (diffInDays === 1) {
    // Completed yesterday → continue streak
    user.streak += 1;
  } else if (diffInDays > 1) {
    // Missed one or more days → reset streak
    user.streak = 1;
  }
  // diffInDays === 0 → already completed today, keep streak unchanged

  user.lastCompletedDate = new Date();
};
const unlockBadges = async (user) => {
  const completedQuests = await Quest.countDocuments({
    user: user._id,
    completed: true,
  });

  // 1st completed quest
  if (completedQuests >= 1 && !user.badges.includes("Beginner")) {
    user.badges.push("Beginner");
  }

  // 7-day streak
  if (user.streak >= 7 && !user.badges.includes("Consistent")) {
    user.badges.push("Consistent");
  }

  // 500 XP
  if (user.xp >= 500 && !user.badges.includes("XP Hunter")) {
    user.badges.push("XP Hunter");
  }

  // 25 completed quests
  if (completedQuests >= 25 && !user.badges.includes("Study Master")) {
    user.badges.push("Study Master");
  }

  // Level 10
  if (user.level >= 10 && !user.badges.includes("Legend")) {
    user.badges.push("Legend");
  }
};

module.exports = {
  awardXP,calculateLevel,updateStreak,unlockBadges,
};