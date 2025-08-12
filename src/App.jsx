import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Api from "./services/back/api_service";

//layouts
import AdminLayout from './layouts/admin_layout';
import UserLayout from './layouts/user_layout';

//admin pages start

//user
import Login from "./pages/back/user/login";
import Register from "./pages/back/user/register";
import UserList from './pages/back/user/user_list';
import AddEditUser from "./pages/back/user/add_edit_user";

//index
import Dashboard from './pages/back/dashboard';

// movie
import MovieList from "./pages/back/movie/movie_list";
import AddEditMovie from "./pages/back/movie/add_edit_movie";

//screen
import ScreenList from "./pages/back/screen/screen_list";
import AddEditScreen from "./pages/back/screen/add_edit_screen";

// movie assign
import MovieAssignList from "./pages/back/movie_assign/movie_assign_list";
import AddEditMovieAssign from "./pages/back/movie_assign/add_edit_movie_assign";

//admin pages end

//front user pages
import Home from './pages/front/home';
import Movie from "./pages/front/movie";
import MovieBookingComponent from "./pages/front/movie_booking";
import MyBookingsComponent from "./pages/front/my_booking";
import UserLogin from "./pages/front/login";
import UserRegister from "./pages/front/register";


//redux
import { useDispatch } from 'react-redux';
import { loginSuccess } from './store/auth_slice';


function App() {
  const navigate = useNavigate();

  const dispatch = useDispatch();


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false); // check only once
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const user = localStorage.getItem("user");
      console.log('kp1');
      if (user) {
        const parsed = JSON.parse(user);
        const accessToken = parsed.access_token;
        console.log('accessToken');
        try {
          const res = await Api.verifyAccessToken({ access_token: accessToken });
          if (res.data.success === true) {
            setIsAuthenticated(true);
            console.log('kp2');
            setUserRole(res.data.user.role)
            dispatch(loginSuccess(res.data.user));

          } else if (res.data.success === false) {
            localStorage.removeItem("user");
            setIsAuthenticated(false);
            // navigate("/admin/login", { replace: true });
          }
        } catch (err) {
          // localStorage.removeItem("user");
          // setIsAuthenticated(false);
          // navigate("/admin/login", { replace: true });
        }
      } else {
        setIsAuthenticated(false);
        // navigate("/admin/login", { replace: true });
      }

      setCheckedAuth(true);
    };

    checkToken();
  }, [navigate]);

  // ✅ Render only after checking auth once
  if (!checkedAuth) return <div></div>;


  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
    if (userRole !== "admin") return <Navigate to="/" replace />;
    return children;
  };
 

  return (
    <div>

      <Routes>
        <Route path="/admin/login" element={ isAuthenticated ? userRole === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/" /> : <Login /> } />
        <Route path="/admin/register" element={ isAuthenticated ? userRole === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/" /> : <Register /> } />
         

         {/* admin back user codes */}
        <Route path="/admin/*" element={ <ProtectedRoute> <AdminLayout /> </ProtectedRoute> } >
          <Route index element={<Dashboard replace  />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserList />} />
          <Route path="user_add" element={<AddEditUser />} />
          <Route path="user_edit/:id" element={<AddEditUser />} />
          <Route path="movies" element={<MovieList />} />
          <Route path="movie_add" element={<AddEditMovie />} />
          <Route path="movie_edit/:id" element={<AddEditMovie />} />
          <Route path="screens" element={<ScreenList />} />
          <Route path="screen_add" element={<AddEditScreen />} />
          <Route path="screen_edit/:id" element={<AddEditScreen />} />
          <Route path="movie_assign_list" element={<MovieAssignList />} />
          <Route path="movie_assign_add" element={<AddEditMovieAssign />} />
          <Route path="movie_assign_edit/:id" element={<AddEditMovieAssign />} />
        </Route>

        {/* front user code start */}
        <Route path="/*" element={ isAuthenticated && userRole === "admin" ? <Navigate to="/admin/dashboard" /> :  <UserLayout />}>
           <Route index  element={<Home />} />
            <Route path="movies" element={<Movie />} />
             <Route path="book/:movieId" element={<MovieBookingComponent />} />
             <Route path="my_bookings" element={<MyBookingsComponent />} />
           <Route path="login" element={ isAuthenticated ? <Navigate to="/" /> : <UserLogin />} />
           <Route path="register"  element={<UserRegister />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;



// Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
//  - options.allowedHosts[0] should be a non-empty string.

// "proxy": "http://localhost:5000",
