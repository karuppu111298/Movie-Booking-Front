// client/src/services/http-common.js
import axios from "axios";
//"proxy": "http://localhost:5000",d
const api = axios.create({
  baseURL: "http://localhost:5000/api/", // No trailing slash
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