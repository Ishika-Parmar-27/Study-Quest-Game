const express = require("express");
const router = express.Router();
const {
  createQuest,
  getMyQuests,updateQuest,completeQuest,
} = require("../controllers/questController");
const { protect } = require("../middleware/authMiddleware");
router
  .route("/")
  .post(protect, createQuest)
  .get(protect, getMyQuests);
router.route("/:id").put(protect, updateQuest);
router.route("/:id/complete").patch(protect, completeQuest);
module.exports = router;