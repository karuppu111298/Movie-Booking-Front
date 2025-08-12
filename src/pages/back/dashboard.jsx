import React, { useEffect, useState } from "react";
import Api from "../../services/back/api_service"; // your API wrapper

const Dashboard = () => {
  const [stats, setStats] = useState({
    usersCount: 0,
    moviesCount: 0,
    bookedUsersCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await Api.getDashboardStats({ token: user.access_token });
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
        alert("Failed to load dashboard stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading stats...</div>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="mt-4 text-4xl font-bold">{stats.usersCount}</p>
        </div>

        {/* Movies Card */}
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Total Movies</h2>
          <p className="mt-4 text-4xl font-bold">{stats.moviesCount}</p>
        </div>

        {/* Booked Users Card */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold">Booked Users</h2>
          <p className="mt-4 text-4xl font-bold">{stats.bookedUsersCount}</p>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
