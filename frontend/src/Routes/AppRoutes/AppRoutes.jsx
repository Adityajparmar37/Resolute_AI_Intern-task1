import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import Profile from "../../Pages/Profile/Profile";
import AuthRoute from "../AuthRoutes/AuthRouters";
import LandingPage from "../../Pages/LandingPage/LandingPage";

export default function AppRoutes() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000 }}
      />
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
}
