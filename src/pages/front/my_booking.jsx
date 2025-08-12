import React, { useEffect, useState } from "react";
import Api from "../../services/back/api_service"; // your API wrapper
import { FaTicketAlt, FaCalendarAlt, FaChair } from "react-icons/fa";

const MyBookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await Api.getMyBookings({ token: user.access_token });
        setBookings(res.data || []);
      } catch (err) {
        console.error("Error fetching bookings", err);
        alert("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return <div className="p-6 text-lg text-blue-600">Loading your bookings...</div>;

  if (bookings.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        You haven't booked any movies yet.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        My Bookings
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl border border-gray-200 transition transform hover:-translate-y-1"
          >
            <div className="p-4">
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                <FaTicketAlt className="inline-block mr-2 text-blue-500" />
                {b.movie?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Screen:</strong> {b.screen?.screen_name}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <FaCalendarAlt className="inline-block mr-2 text-green-500" />
                <strong>Show Time:</strong>{" "}
                {new Date(b.show_time).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                <FaChair className="inline-block mr-2 text-purple-500" />
                <strong>Seats:</strong>{" "}
                <span className="font-medium text-gray-800">
                  {b.seats?.map((seat) => seat.name).join(", ")}
                </span>
              </p>
            </div>
            <div className="bg-blue-100 text-center text-sm py-2 text-blue-800 font-semibold rounded-b-lg">
              Booking ID: {b._id.slice(-6).toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsComponent;
