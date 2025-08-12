import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Api from "../../../services/back/api_service";

export default function ScreenList() {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [screens, setScreens] = useState([]);

  const totalScreens = screens.length;
  const totalPages = Math.ceil(totalScreens / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedScreens = screens.slice(startIndex, startIndex + pageSize);

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
    const fetchScreens = async () => {
      try {
        const res = await Api.getScreens(); // ✅ Change API call for screens
        setScreens(res.data?.screens || []);
      } catch (err) {
        console.error("Error fetching screens:", err);
      }
    };
    fetchScreens();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2 text-gray-800">
          <h2 className="text-2xl font-semibold">Screens</h2>
          <span className="text-gray-400 text-xl">›</span>
          <span className="text-gray-500 text-sm mt-1">Screen List</span>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/admin/screen_add">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              + Add Screen
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["Screen Name", "Seat Qty", "Actions"].map((header) => (
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
            {paginatedScreens.map((screen, index) => (
              <tr key={index} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-2 border-b border-gray-200">
                  {screen.screen_name}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {screen.seat_qty}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center space-x-2">
                  {/* <Link to={`/admin/screen_edit/${screen._id}`}>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700" title="Edit">
                      ✎
                    </button>
                  </Link>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    title="Delete"
                    onClick={() => console.log("Delete screen", screen._id)}
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
            <span className="font-medium">{Math.min(startIndex + pageSize, totalScreens)}</span> of{" "}
            <span className="font-medium">{totalScreens}</span> results
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
