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
        <div className="text-xs font-semibold text-gray-500 uppercase">User Management</div>
         <Link
         to="/admin/users"
         className="block px-4 py-2 rounded hover:bg-blue-100 text-blue-600 font-medium">User List
        </Link>

        <div className="text-xs font-semibold text-gray-500 uppercase mt-4">HTML</div>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Icons</a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Icons</a>

        <div className="text-xs font-semibold text-gray-500 uppercase mt-4">CSS</div>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Icons</a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Icons</a>

        <div className="text-xs font-semibold text-gray-500 uppercase mt-4">JavaScript</div>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Icons</a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Icons</a>

        <div className="text-xs font-semibold text-gray-500 uppercase mt-4">PHP</div>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Icons</a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Icons</a>
        <a href="#" className="block px-4 py-2 rounded hover:bg-gray-100">Icons</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
