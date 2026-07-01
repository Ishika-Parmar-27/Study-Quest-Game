import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center border rounded-xl shadow p-4">
      <h2 className="text-xl font-bold">Study Quest</h2>

      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        <Link to="/analytics" className="hover:underline">
          Analytics
        </Link>

        <Link to="/leaderboard" className="hover:underline">
          Leaderboard
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;