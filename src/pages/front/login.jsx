import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FiEye, FiEyeOff, FiMail, FiLock } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../../components/back/input';
import Api from '../../services/back/api_service';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ user_name: "", password: "", role:'user' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const validateForm = () => {
    let newErrors = {};
    if (!formData.user_name) {
      newErrors.user_name = "Field is Required!";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_name)) {
      newErrors.user_name = "Invalid email format!";
    }

    if (!formData.password) {
      newErrors.password = "Field is Required!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm() !== 0) {
      toast.error('Please Fill Required Fields');
      return;
    }

    setLoading(true);

    try {
      const res = await Api.login(formData);
      console.log('res', res);

      if (res.data.login_details.success === true) {
        localStorage.setItem("user", JSON.stringify(res.data.login_details));
        navigate("/");
      } else {
        toast.info(res.data.login_details.message);
      }
    } catch (error) {
      toast.warning("Login Failed");
    }finally{
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-blue-200 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          🔐 Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute top-3.5 left-3 text-gray-400" />
            <Input
              type="email"
              placeholder="Email"
              name="user_name"
              value={formData.user_name}
              handleChange={handleChange}
              className="pl-10"
            />
            <span className="absolute top-3.1 right-1 text-red-500">*</span>
          </div>

          <div className="relative">
            <FiLock className="absolute top-3.5 left-3 text-gray-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={formData.password}
              handleChange={handleChange}
              className="pl-10"
            />
            <span className="absolute top-3.1 right-1 text-red-500">*</span>

            <div
              className="absolute top-3.5 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-md transition duration-300 ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          > 
          {loading ? 'Logging in...' : 'Login'}
          </button>


          <p className="text-center text-sm text-gray-500 mt-2">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
    </div>
  );
}

export default Login;
