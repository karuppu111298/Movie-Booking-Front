import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Api from "../../../services/back/api_service";
import config from "../../../config";



export default function MovieAssignList() {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const totalMovies = movies.length;
  const totalPages = Math.ceil(totalMovies / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedMovies = movies.slice(startIndex, startIndex + pageSize);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await Api.getAssignMovies(); // ✅ API for assignable movies
        setMovies(res.data?.movieAssigns || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const handleAssign = (movieId) => {
    // You could navigate to an "Assign Movie" page or show a modal
    console.log("Assign movie:", movieId);
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2 text-gray-800">
          <h2 className="text-2xl font-semibold">Movies</h2>
          <span className="text-gray-400 text-xl">›</span>
          <span className="text-gray-500 text-sm mt-1">Assign Movie</span>
        </div>
        {/* Optional: Button to create a new assignment directly */}
        <Link to="/admin/movie_assign_add">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
            + Assign New Movie
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["Poster", "Movie Name", "Assigned Screen", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.map((movie, index) => (
              <tr key={index} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-2 border-b border-gray-200">
                  <img
                    src={`${config.REACT_APP_IMAGE_URL}/${movie.image}`}
                    alt={movie.title}
                    className="w-16 h-24 object-cover"
                  />
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {movie.title}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {movie.screen_name}
                </td>
               <td className="px-4 py-2 border-b border-gray-200 text-center space-x-2">
                  {/* <Link to={`/admin/movie_edit/${movie._id}`}>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700" title="Edit">
                      ✎
                    </button>
                  </Link>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    title="Delete"
                    onClick={() => console.log("Delete movie", movie._id)}
                  >
                    ✖
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t border-gray-200">
          <div className="text-sm text-gray-600 mb-2 md:mb-0">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">{Math.min(startIndex + pageSize, totalMovies)}</span> of{" "}
            <span className="font-medium">{totalMovies}</span> results
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="pageSize" className="text-sm text-gray-600">Show:</label>
              <select
                id="pageSize"
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {[5, 10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                ◀
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
