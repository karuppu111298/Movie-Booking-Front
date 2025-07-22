// client/src/services/http-common.js
import axios from "axios";

export default axios.create({
  baseURL: "/api/", // No trailing slash
  headers: {
    "Content-Type": "application/json"
  }
});
