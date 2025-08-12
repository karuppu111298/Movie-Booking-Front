import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../services/back/api_service";

const MovieBookingComponent = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toggle seat selection using full seat object
  const toggleSeat = (seat) => {
    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.id === seat.id);
      return exists
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat];
    });
  };

  // Handle booking with full seat objects
  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    try {
      const user = localStorage.getItem("user");
      const parsed = JSON.parse(user);
      const accessToken = parsed.access_token;

      await Api.bookSeats({
        movieId,
        seats: selectedSeats, // full seat objects now
        token: accessToken,
      });
      navigate("/my_bookings"); 
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed. Try again.");
    }
  };

  // Fetch movie + screen data
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await Api.getMovieDetails({ movieId });
        setMovieData(res.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return <div className="p-6 text-lg">Loading movie details...</div>;
  }

  const { movie, screen, show_time } = movieData;
  const { left = [], center = [], right = [] } = screen?.seat_number || {};

  // SeatGrid component: renders buttons for a section
  const SeatGrid = ({ sectionSeats, color }) => (
    <div className="flex flex-wrap gap-2 justify-center">
      {sectionSeats.map((seat, idx) => {
        const isSelected = selectedSeats.find((s) => s.id === seat.id);
        return (
         <button
  key={seat.id || idx}
  onClick={() => toggleSeat(seat)}
  disabled={seat.isBooked}
  className={`w-10 h-10 rounded text-xs font-medium flex items-center justify-center border transition
    ${seat.isBooked
      ? "bg-gray-400 text-white cursor-not-allowed"
      : isSelected
        ? "bg-green-600 text-white"
        : `${color} text-white hover:opacity-80`
    }
  `}
>
  {seat.name}
</button>

        );
      })}
    </div>
  );

  return (
    <div className="px-6 py-8">
      {/* Movie Info */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div>
          <h2 className="text-2xl font-bold">{movie?.title}</h2>
          <p className="text-gray-600 mt-1">
            <strong>Screen:</strong> {screen?.screen_name}
          </p>
          <p className="text-gray-600">
            <strong>Show Time:</strong>{" "}
            {new Date(show_time).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Seat Layout */}
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Seat Layout</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {left.length > 0 && (
            <div>
              <h3 className="text-center mb-2 font-medium">Left</h3>
              <SeatGrid sectionSeats={left} color="bg-blue-500" />
            </div>
          )}
          {center.length > 0 && (
            <div>
              <h3 className="text-center mb-2 font-medium">Center</h3>
              <SeatGrid sectionSeats={center} color="bg-blue-500" />
            </div>
          )}
          {right.length > 0 && (
            <div>
              <h3 className="text-center mb-2 font-medium">Right</h3>
              <SeatGrid sectionSeats={right} color="bg-blue-500" />
            </div>
          )}
        </div>
      </div>

      {/* Confirm Booking */}
      <div className="mt-6 text-center">
        <button
          onClick={handleBooking}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default MovieBookingComponent;
