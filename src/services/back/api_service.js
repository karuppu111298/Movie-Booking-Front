import http from "../../http-common";

class Auth {

  //user code
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
  // movie code
  getMovies(data) {
    return http.post("/movies_list", data);
  }
  getMovieById(data) {
    return http.post("/movie_edit", data);
  }
  updateMovie(id, data) {
    return http.post(`/movie_update/${id}`, data);
  }
  createMovie(data) {
    return http.post("/movie_create", data);
  }
  //screen
  getScreens(data) {
    return http.post("/screen_list", data);
  }
  getScreenById(data) {
    return http.post("/screen_edit", data);
  }
  updateScreen(id, data) {
    return http.post(`/screen_update/${id}`, data);
  }
  createScreen(data) {
    return http.post("/movie_create", data);
  }
  // movie assign 
  getAssignMovies(data) {
    return http.post("/movie_assign_list", data);
  }
  getAssignMovieById(data) {
    return http.post("/movie_assign_edit", data);
  }
  updateAssignMovie(id, data) {
    return http.post(`/movie_assign_update/${id}`, data);
  }
  createAssignMovie(data) {
    return http.post("/movie_assign_create", data);
  }

  // dashboard
  getDashboardStats(data) {
    return http.post("/dashboard_stats", data);
  }
  //front user
  getFrontAssignMovies(data) {
    return http.post("/front_movie_assign_list", data);
  }
  getMovieDetails(data) {
    return http.post("/front_movie_details", data);
  }
  bookSeats(data) {
  return http.post("/book_seats", data); 
  }
  getMyBookings(data){
      return http.post("/my_bookings", data);
  }

}

export default new Auth();