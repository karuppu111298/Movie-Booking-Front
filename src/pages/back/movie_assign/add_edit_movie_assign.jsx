import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../../services/back/api_service"; // your API helper

function MovieAssign() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    movieId: "",
    screenId: "",
    showTime: "",
  });

  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.movieId) newErrors.movieId = "Please select a movie!";
    if (!formData.screenId) newErrors.screenId = "Please select a screen!";
    if (!formData.showTime) newErrors.showTime = "Please pick a show time!";
    setErrors(newErrors);
    return Object.keys(newErrors).length;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle date picker change
  const handleDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      showTime: e.target.value,
    }));
  };

  // Fetch movie and screen lists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await Api.getMovies(); // GET all movies
        const screenRes = await Api.getScreens(); // GET all screens
        setMovies(movieRes.data.movies || []);
        setScreens(screenRes.data.screens || []);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, []);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm() !== 0) {
      toast.error("Please fill required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await Api.createAssignMovie(formData); // POST request
      if (response.data.success) {
        toast.success("Movie assigned successfully!");
        navigate("/assignments"); // redirect to assignment list page
      } else {
        toast.error(response.data.message || "Failed to assign movie");
      }
    } catch (error) {
      toast.error("Error assigning movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Assign Movie to Screen
          </h1>
          <p className="text-sm text-gray-500">Fill in the assignment details below.</p>
        </div>
        <Link to="/admin/movie_assign_list">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm">
            ← Back to Assignments
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Movie Dropdown */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Movie <span className="text-red-500">*</span>
          </label>
          <select
            name="movieId"
            value={formData.movieId}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select a movie</option>
            {movies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
          {errors.movieId && <p className="text-red-500 text-sm">{errors.movieId}</p>}
        </div>

        {/* Screen Dropdown */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Screen <span className="text-red-500">*</span>
          </label>
          <select
            name="screenId"
            value={formData.screenId}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select a screen</option>
            {screens.map((screen) => (
              <option key={screen._id} value={screen._id}>
                {screen.screen_name}
              </option>
            ))}
          </select>
          {errors.screenId && <p className="text-red-500 text-sm">{errors.screenId}</p>}
        </div>

        {/* Show Time */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">
            Show Time <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="showTime"
            value={formData.showTime}
            onChange={handleDateChange}
            className="border px-3 py-2 rounded w-full"
          />
          {errors.showTime && <p className="text-red-500 text-sm">{errors.showTime}</p>}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white px-6 py-2 rounded ${
              loading ? "cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Assign Movie"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default MovieAssign;
