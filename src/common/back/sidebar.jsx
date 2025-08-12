import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0 flex flex-col">
      {/* Fixed Branding Header */}
      <div className="p-[1.12rem] text-center font-bold text-xl text-blue-600 border-b">
        Movie 
      </div>

      {/* Scrollable nav area */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
         <div className="text-xs font-semibold text-gray-500 uppercase">Index</div>
         <Link
         to="/admin/dashboard"
         className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium">Dashboard
        </Link>
        <div className="text-xs font-semibold text-gray-500 uppercase">Movie Management</div>
         <Link
         to="/admin/movies"
         className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium">Movie List
        </Link>
        <Link
         to="/admin/screens"
         className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium">Screen List
        </Link>
         <Link
         to="/admin/movie_assign_list"
         className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium">Movie Assign List
        </Link>
        
         <div className="text-xs font-semibold text-gray-500 uppercase">User Management</div>
         <Link
         to="/admin/users"
         className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium">User List
        </Link>

      </nav>
    </aside>
  );
};

export default Sidebar;
