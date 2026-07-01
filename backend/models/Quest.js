const mongoose = require("mongoose");

const questSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Quest title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    xpReward: {
      type: Number,
      default: 10,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quest", questSchema);