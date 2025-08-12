// client/src/services/http-common.js
import axios from "axios";
import config from "./config";
//"proxy": "http://localhost:5000",d



const api = axios.create({
  baseURL: config.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use(
  (config) => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        const token = parsed?.access_token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.error("Auth interceptor error:", err);
      // Do nothing if user not valid
    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;