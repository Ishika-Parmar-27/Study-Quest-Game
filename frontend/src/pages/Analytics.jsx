import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {
  const [analytics, setAnalytics] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const res = await api.get("/analytics/weekly");
      setAnalytics(res.data.analytics);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const totalXP = analytics.reduce((sum, item) => sum + item.totalXP, 0);
  const totalCompleted = analytics.reduce(
    (sum, item) => sum + item.completedQuests,
    0
  );
  const studyDays = analytics.length;

  return (
    <div className="p-6">
      <Navbar />

      <h1 className="text-3xl font-bold mt-6">Weekly Analytics</h1>

      {analytics.length === 0 ? (
        <p className="mt-4">No completed quests this week.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="border rounded-xl p-4 shadow">
              <h3 className="font-semibold">Total XP Earned</h3>
              <p className="text-2xl font-bold">{totalXP}</p>
            </div>

            <div className="border rounded-xl p-4 shadow">
              <h3 className="font-semibold">Completed Quests</h3>
              <p className="text-2xl font-bold">{totalCompleted}</p>
            </div>

            <div className="border rounded-xl p-4 shadow">
              <h3 className="font-semibold">Study Days</h3>
              <p className="text-2xl font-bold">{studyDays}</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8">XP Earned Per Day</h2>

          <div className="mt-4 border rounded-xl p-4 shadow">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="totalXP"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <h2 className="text-xl font-semibold mt-8">
            Completed Quests Per Day
          </h2>

          <div className="mt-4 border rounded-xl p-4 shadow">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completedQuests" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;