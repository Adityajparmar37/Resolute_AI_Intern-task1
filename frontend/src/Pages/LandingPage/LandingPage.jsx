import { useEffect } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useLoading } from "../../Hooks/useLoading";

export default function LandingPage() {
  const { user } = useAuth();
  const { showLoading, hideLoading } =
    useLoading();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      showLoading();
      navigate("/home");
      hideLoading();
    }
  }, [user, navigate]);

  return user ? (
    navigate("/home")
  ) : (
    <div className="pt-20 bg-gradient-to-t from-skyBlue-rgba h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center md:text-left md:ml-10">
        <h1 className="text-black text-4xl font-light md:text-xl md:mt-25 lg:text-5xl mr-5">
          Unified Profiles, Effortless Management
        </h1>
        <div className="outline-double rounded-md w-1/2 my-8"></div>
        <Link to="/signup">
          <button
            type="button"
            className="w-28 h-14 text-white bg-blue-700 hover:bg-blue-800 hover:rounded-[5rem] focus:ring-2 focus:outline-none focus:ring-white font-medium rounded-lg text-md px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-white">
            Sign Up
          </button>
        </Link>
      </div>
      <img
        src="../../../public/Landing_Photo-removebg-preview.png"
        className="md:w-[40rem] lg:w-[40rem] mt-5"
        alt="Image Representation"
      />
    </div>
  );
}
