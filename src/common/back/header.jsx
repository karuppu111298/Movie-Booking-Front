import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
     navigate("/admin/login", { replace: true });
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-6 relative z-50">
      <div>
        <input
          type="text"
          placeholder="Search for anything..."
          className="px-4 py-2 border rounded-full text-sm w-64 focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button><i className="far fa-moon"></i></button>
        <button><i className="far fa-bell"></i></button>
        <button><i className="far fa-envelope"></i></button>

        {/* Profile Dropdown */}
        <div className="relative group">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="User"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <ul className="py-2 text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{user ? user.name : 'No Login'}</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Profile</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Password</li>
              <li className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer" onClick={handleLogout}>Logout</li>
            </ul>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
