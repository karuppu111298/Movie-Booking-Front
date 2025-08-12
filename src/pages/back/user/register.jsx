import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from 'react-icons/fi';
import Api from '../../../services/back/api_service';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
   const [formData, setFormData] = useState({
      name:"",
      email: "",
      password: "",
      confirm_password: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
  
    const validateForm = () => {
      let newErrors = {};
  
      if (!formData.name) {
        newErrors.name = "Field is Required!";
      } 

      if (!formData.email) {
        newErrors.email = "Field is Required!";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format!";
      }

      if (!formData.password) {
        newErrors.password = "Field is Required!";
      } else if (formData.password.length < 5) {
        newErrors.password = "Password must be at least 5 characters long!";
        alert('Password must be at least 5 characters long!'); 
      }
  
      if (!formData.confirm_password) {
        newErrors.confirm_password = "Confirm Password is Required!";
      } else if (formData.password !== formData.confirm_password) {
        newErrors.confirm_password = "Passwords do not match!";
        alert('Passwords do not match!'); 
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length;
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (validateForm() !=0) {
        alert('Please Fill Required Fields'); 
        return;
      }
  
      try {
        Api.register({ 
          email: formData.email, 
          password: formData.password 
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/admin/login");
        })
        .catch((e) => {
          console.log(e);
          alert("Registration failed");
        });
  
      } catch (error) {
        alert("Registration failed");
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-blue-200 flex justify-center items-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📝 Create an Account</h2>
        
       <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FiUser className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
               name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <span className="absolute top-3.1 right-1 text-red-500">*</span>
          </div>
          <div className="relative">
            <FiMail className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
              <span className="absolute top-3.1 right-1 text-red-500">*</span>
          </div>
          <div className="relative">
            <FiLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
              <span className="absolute top-3.1 right-1 text-red-500">*</span>
            <div
              className="absolute top-3.5 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          <div className="relative">
            <FiLock className="absolute top-3.5 left-3 text-gray-400" />
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
            />
              <span className="absolute top-3.1 right-1 text-red-500">*</span>
            <div
              className="absolute top-3.5 right-3 cursor-pointer text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-500 mt-2">
            Already have an account?{' '}
          <Link to="/admin/login"  className="text-blue-600 hover:underline">Login
                      </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
