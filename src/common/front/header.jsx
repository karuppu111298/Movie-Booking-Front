import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../store/auth_slice';

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-6 fixed top-0 left-0 w-full z-50">
      {/* Left: Logo */}
      <div className="flex items-center space-x-4">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt="Logo"
          className="w-8 h-8"
        />
        <span className="text-xl font-bold text-gray-800">MyApp</span>
      </div>

      {/* Center: Navigation Links */}
      <nav className="space-x-6 text-gray-700 text-sm font-medium hidden md:flex">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/movies" className="hover:text-blue-600 transition">Movies</Link>
        {!isAuthenticated && (
          <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
        )}
        {isAuthenticated && user.role === 'user' && (
          <>
            <Link to="/my_bookings" className="hover:text-blue-600 transition">My Bookings</Link>
          </>
        )}
      </nav>

      {/* User Menu */}
      <div className="relative group">
        {isAuthenticated && user.role === 'user' && (
          <>
            <img
              src="https://randomuser.me/api/portraits/men/68.jpg"
              alt="User"
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <ul className="py-2 text-sm text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{user ? user.name : 'No Login'}</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Change Password</li>
                <li
                  className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
