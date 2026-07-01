const authRoutes = require("./routes/authRoutes");
const questRoutes = require("./routes/questRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/User");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.get("/", (req, res) => {
  res.send("Study Quest API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  app.get("/test-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Ishika",
      email: "ishika@test.com",
      password: "123456",
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
});