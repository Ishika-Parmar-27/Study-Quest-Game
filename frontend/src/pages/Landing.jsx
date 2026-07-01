import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-4xl w-full text-center">
        <h1 className="text-5xl font-bold text-indigo-600">
          Study Quest
        </h1>

        <p className="text-xl text-gray-600 mt-4">
          Gamify your learning journey with quests, XP, badges, analytics and leaderboard.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
          <div className="bg-indigo-50 p-5 rounded-2xl">
            <h3 className="font-bold">🎯 Quests</h3>
            <p className="text-sm text-gray-600 mt-2">Create and complete study tasks.</p>
          </div>

          <div className="bg-green-50 p-5 rounded-2xl">
            <h3 className="font-bold">⭐ XP</h3>
            <p className="text-sm text-gray-600 mt-2">Earn XP and level up.</p>
          </div>

          <div className="bg-yellow-50 p-5 rounded-2xl">
            <h3 className="font-bold">🎖 Badges</h3>
            <p className="text-sm text-gray-600 mt-2">Unlock achievements.</p>
          </div>

          <div className="bg-pink-50 p-5 rounded-2xl">
            <h3 className="font-bold">📊 Analytics</h3>
            <p className="text-sm text-gray-600 mt-2">Track weekly progress.</p>
          </div>
        </div>

        <div className="mt-10 flex gap-4 justify-center">
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl font-semibold"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;