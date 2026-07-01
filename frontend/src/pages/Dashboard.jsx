import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Dashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [quests, setQuests] = useState([]);
  const [questForm, setQuestForm] = useState({
    title: "",
    description: "",
    xpReward: "",
  });

  const loadData = async () => {
    const dashboardRes = await api.get("/dashboard");
    const questsRes = await api.get("/quests");
    setDashboard(dashboardRes.data.dashboard);
    setQuests(questsRes.data.quests);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuestChange = (e) => {
    setQuestForm({
      ...questForm,
      [e.target.name]: e.target.value,
    });
  };

  const createQuest = async (e) => {
    e.preventDefault();

    await api.post("/quests", {
      title: questForm.title,
      description: questForm.description,
      xpReward: Number(questForm.xpReward),
    });

    setQuestForm({ title: "", description: "", xpReward: "" });
    await loadData();
    alert("Quest created");
  };

  const completeQuest = async (id) => {
    await api.patch(`/quests/${id}/complete`);
    await loadData();
    alert("Quest Completed 🎉");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!dashboard) return <h2 className="p-6">Loading dashboard...</h2>;

  const currentLevelXP = (dashboard.user.level - 1) * 100;
  const progressXP = dashboard.user.xp - currentLevelXP;
  const progressPercent = Math.min((progressXP / 100) * 100, 100);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <div className="mt-8">
        <h1 className="text-4xl font-bold">Welcome, {dashboard.user.name} 👋</h1>
        <p className="text-gray-600 mt-2">Track your study quests and level up daily.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">⭐ Total XP</p>
          <h2 className="text-3xl font-bold">{dashboard.user.xp}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">🏆 Level</p>
          <h2 className="text-3xl font-bold">{dashboard.user.level}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">🔥 Streak</p>
          <h2 className="text-3xl font-bold">{dashboard.user.streak} days</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-xl font-bold">XP Progress</h2>
        <p className="text-gray-600 mt-2">{progressXP} / 100 XP to next level</p>

        <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
          <div
            className="bg-indigo-600 h-4 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-xl font-bold">🎖 Badges</h2>

        {dashboard.user.badges.length === 0 ? (
          <p className="text-gray-500 mt-3">No badges yet</p>
        ) : (
          <div className="flex gap-3 flex-wrap mt-4">
            {dashboard.user.badges.map((badge) => (
              <span
                key={badge}
                className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold"
              >
                🎖 {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">📚 Total Quests</p>
          <h2 className="text-3xl font-bold">{dashboard.stats.totalQuests}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">✅ Completed</p>
          <h2 className="text-3xl font-bold">{dashboard.stats.completedQuests}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">⏳ Pending</p>
          <h2 className="text-3xl font-bold">{dashboard.stats.pendingQuests}</h2>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 mt-6">
        <h2 className="text-2xl font-bold">Create New Quest</h2>

        <form onSubmit={createQuest} className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
          <input
            type="text"
            name="title"
            placeholder="Quest title"
            value={questForm.title}
            onChange={handleQuestChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Quest description"
            value={questForm.description}
            onChange={handleQuestChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="xpReward"
            placeholder="XP Reward"
            value={questForm.xpReward}
            onChange={handleQuestChange}
            className="border rounded-lg p-3"
            required
          />

          <button className="bg-indigo-600 text-white rounded-lg px-4 py-3 font-semibold">
            Add Quest
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">My Quests</h2>

        {quests.length === 0 ? (
          <p className="text-gray-600 mt-3">No quests yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
            {quests.map((quest) => (
              <div key={quest._id} className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">📘 {quest.title}</h3>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      quest.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {quest.completed ? "Completed" : "Pending"}
                  </span>
                </div>

                <p className="text-gray-600 mt-3">{quest.description}</p>

                <p className="mt-4 font-semibold">⭐ {quest.xpReward} XP</p>

                {!quest.completed && (
                  <button
                    onClick={() => completeQuest(quest._id)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Complete Quest
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;