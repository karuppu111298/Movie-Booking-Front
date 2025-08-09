// client/src/services/http-common.js
import axios from "axios";
//"proxy": "http://localhost:5000",d


// Local development
// const REACT_APP_API_URL="http://localhost:5000/api"

//Production
const REACT_APP_API_URL="https://movie-booking-back-tywe.onrender.com/api"


const api = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// api.interceptors.request.use((config) => {
//   const user = localStorage.getItem("user");
//   const parsed = JSON.parse(user);
//   const accessToken = parsed.access_token;
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }
//   return config;
// });

export default api;