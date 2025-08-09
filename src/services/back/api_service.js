import http from "../../http-common";

class Auth {

  login(data) {
    return http.post("/login", data);
  }
  register(data) {
    return http.post("/user_create", data);
  }
  verifyAccessToken(data) {
    return http.post("/verify_access_token", data);
  }
  getUsers(data) {
    return http.post("/users_list", data);
  }
  getUserById(data) {
    return http.post("/user_edit", data);
  }
  updateUser(id, data) {
    return http.post(`/user_update/${id}`, data);
  }



}

export default new Auth();