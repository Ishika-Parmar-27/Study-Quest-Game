import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    const res = await api.get("/leaderboard");
    setLeaderboard(res.data.leaderboard);
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="p-6">
      <Navbar />

      <h1 className="text-3xl font-bold mt-6">Leaderboard</h1>
      <p className="text-gray-600 mt-2">
        Top learners ranked by XP
      </p>

      <div className="mt-6 space-y-4">
        {leaderboard.length === 0 ? (
          <p>No users found</p>
        ) : (
          leaderboard.map((user, index) => (
            <div
              key={user._id}
              className="border rounded-xl p-5 shadow flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold">
                  {getMedal(index)} {user.name}
                </h3>

                <p>XP: {user.xp}</p>
                <p>Level: {user.level}</p>
                <p>Streak: {user.streak}</p>

                <p>
                  Badges:{" "}
                  {user.badges.length > 0
                    ? user.badges.join(", ")
                    : "No badges"}
                </p>
              </div>

              <div className="text-3xl font-bold">
                {user.xp} XP
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Leaderboard;