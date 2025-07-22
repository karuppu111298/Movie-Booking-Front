import React, { useState } from "react";
import { Link } from 'react-router-dom';

const sampleUsers = [
  {
    firstName: "Bella",
    lastName: "Chloe",
    position: "System Developer",
    startDate: "2018/03/12",
    salary: "$654,765",
    email: "b.Chloe@datatables.net",
  },
  {
    firstName: "Donna",
    lastName: "Bond",
    position: "Account Manager",
    startDate: "2012/02/21",
    salary: "$543,654",
    email: "d.bond@datatables.net",
  },
  {
    firstName: "Garrett",
    lastName: "Winters",
    position: "Marketing Designer",
    startDate: "2019/04/01",
    salary: "$230,000",
    email: "g.winters@datatables.net",
  },
  {
    firstName: "Ashton",
    lastName: "Cox",
    position: "UX Designer",
    startDate: "2021/07/22",
    salary: "$120,000",
    email: "a.cox@datatables.net",
  },
  {
    firstName: "Cedric",
    lastName: "Kelly",
    position: "DevOps Engineer",
    startDate: "2020/01/10",
    salary: "$150,000",
    email: "c.kelly@datatables.net",
  },
  {
    firstName: "Airi",
    lastName: "Satou",
    position: "Technical Lead",
    startDate: "2015/11/05",
    salary: "$250,000",
    email: "a.satou@datatables.net",
  },
  // Add more if needed to test multiple pages
];

export default function UserTable() {
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const totalUsers = sampleUsers.length;
  const totalPages = Math.ceil(totalUsers / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = sampleUsers.slice(startIndex, startIndex + pageSize);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when page size changes
  };

  return (
    <div className="p-6 bg-white  min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-2 text-gray-800">
          <h2 className="text-2xl font-semibold">Tables</h2>
          <span className="text-gray-400 text-xl">›</span>
          <span className="text-gray-500 text-sm mt-1">Edit Tables</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search for anything..."
              className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Link
            to="/admin/user_add">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              + Add User
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "First Name",
                "Last Name",
                "Position",
                "Start Date",
                "Salary",
                "E-mail",
                "Actions",
              ].map((header) => (
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
            {paginatedUsers.map((user, index) => (
              <tr key={index} className="even:bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.firstName}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.lastName}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.position}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.startDate}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {user.salary}
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-blue-600">
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email}
                  </a>
                </td>
                <td className="px-4 py-2 border-b border-gray-200 text-center space-x-2">
                  <button
                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    title="Edit"
                  >
                    ✎
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    title="Delete"
                  >
                    ✖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between p-4 border-t border-gray-200">
          {/* Left: Showing count */}
          <div className="text-sm text-gray-600 mb-2 md:mb-0">
            Showing{" "}
            <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + pageSize, totalUsers)}
            </span>{" "}
            of <span className="font-medium">{totalUsers}</span> results
          </div>

          {/* Right: Page size + Pagination */}
          <div className="flex items-center space-x-4">
            {/* Page Size Dropdown */}
            <div className="flex items-center space-x-2">
              <label htmlFor="pageSize" className="text-sm text-gray-600">
                Show:
              </label>
              <select
                id="pageSize"
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                {[5, 10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Pagination Arrows */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Previous Page"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Next Page"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
