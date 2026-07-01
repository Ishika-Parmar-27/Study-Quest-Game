const Quest = require("../models/Quest");

const getWeeklyAnalytics = async (req, res) => {
  try { 
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);
    last7Days.setHours(0, 0, 0, 0);
    const analytics = await Quest.aggregate([
      
        {
         $match: {
    user: req.user._id,
    completed: true,
    completedAt: {
      $gte: last7Days,
    },
  },
},
      
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$completedAt",
            },
          },
          completedQuests: { $sum: 1 },
          totalXP: { $sum: "$xpReward" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
      {
  $project: {
    _id: 0,
    date: "$_id",
    completedQuests: 1,
    totalXP: 1,
  },
}
    ]);
    

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
      error: error.message,
    });
  }
};

module.exports = getWeeklyAnalytics;