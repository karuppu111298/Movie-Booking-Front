import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../services/back/api_service";
import config from "../../config";

function MovieAssignmentsList() {
  const [movieAssignments, setMovieAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await Api.getFrontAssignMovies();
        setMovieAssignments(res.data?.movieAssigns || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleBook = (movieId) => {
    // Example: token store pannirukome nu check pannrom
    const token = localStorage.getItem("user");
    if (!token) {
      alert("⚠️ Please login to book tickets!");
      return;
    }
    // Booking page ku navigate pannrom with movieId
    navigate(`/book/${movieId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600">Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🎬 Assigned Movies</h2>

      {movieAssignments.length === 0 ? (
        <p className="text-gray-500">No movies assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movieAssignments.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transform transition-all duration-300"
            >
              <img
                src={`${config.REACT_APP_IMAGE_URL}/${item.image}`}
                alt={item.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Screen:</strong> {item.screen_name}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Show Time:</strong> {item.show_time}
                </p>

                {/* ✅ Book Button */}
                <button
                  onClick={() => handleBook(item._id)}
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieAssignmentsList;
