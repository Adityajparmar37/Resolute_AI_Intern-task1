import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useNavigate,
  useSearchParams,
  Link,
} from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useLoading } from "../../Hooks/useLoading";

export default function SignUp() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } =
    useLoading();
  const [params] = useSearchParams();
  const returnUrl = params.get("returnUrl");
  const { user, signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // console.log(singup);

  useEffect(() => {
    if (!user) return;

    returnUrl
      ? navigate(returnUrl)
      : navigate("/home");
  }, [navigate, returnUrl, user]);
  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        form.password !== form.confirmPassword
      ) {
        hideLoading();
        toast.error("Password must match");
        return;
      }

      // if (form.password.length < 5) {
      //   toast.error("Password must of 6 length");
      // }
      showLoading();
      const SignUpResponse = await signup(form);
      hideLoading();
      console.log(
        "user SignUp=>> ",
        SignUpResponse
      );
    } catch (error) {
      hideLoading();
      toast.error("Some Error Occured !");
      console.log(
        "SignUp API Frontend Error: ",
        error
      );
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-skyBlue-rgba h-screen flex flex-col justify-center items-center">
      <div className="w-full md:w-[28rem] h-5/6 bg-white rounded-xl flex flex-col items-center justify-center p-7 mt-5">
        <h1 className="font-semibold text-2xl md:text-3xl  text-black mb-6">
          Sign Up
        </h1>
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
              Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="name"
              className="mt-1 p-2 w-full border-b-2 md:border-b-4 rounded-md outline-none focus:border-2"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
              Email
            </label>
            <input
              type="email"
              onChange={handleChange}
              name="email"
              className="mt-1 p-2 w-full border-b-2 md:border-b-4 rounded-md outline-none focus:border-2"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              className="mt-1 p-2 w-full border-b-2 md:border-b-4 rounded-md outline-none focus:border-2"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="confirmPassword"
              className="mt-1 p-2 w-full border-b-2 md:border-b-4 rounded-md outline-none focus:border-2"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handlerSubmit}
            type="submit"
            className="w-full bg-blue-700 text-white rounded-md p-2 hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500 hover:rounded-full">
            Sign Up
          </button>
        </form>
      </div>

      <div className="w-full md:w-[25rem] h-15 mt-3 bg-white rounded-xl flex flex-col items-center justify-center p-8">
        <h1 className="font-semibold text-xl md:text-3xl text-black mb-6">
          Already have account !
        </h1>
        <Link to="/login">
          <button
            type="button"
            className="w-full md:w-[20rem] bg-white text-black rounded-md p-2 hover:bg-zinc-200 focus:outline-none focus:ring focus:border-zinc-400 hover:rounded-full border-2 md:border-4">
            Login to account
          </button>
        </Link>
      </div>
    </div>
  );
}
