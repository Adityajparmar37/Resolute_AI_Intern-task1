import { useNavigate } from "react-router-dom";
import * as userService from "../Services/UserService.js";
import toast from "react-hot-toast";

import {
  createContext,
  useState,
  useContext,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    userService.getUser()
  );

  //login
  const login = async (loginData) => {
    try {
      const user = await userService.login(
        loginData
      );
      if (user.success === true) {
        setUser(user);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(user)
        );
        toast.success("Successfully Login !", {
          icon: "👏",
          style: {
            width: "15rem",
            color: "white",
            background: "#3FFF00",
          },
        });
        navigate("/home");
      } else {
        if (user.success === false)
          toast.error(user.message, {
            iconTheme: {
              primary: "#000",
            },
            style: {
              width: "15rem",
              color: "white",
              background: "red",
            },
          });
      }
    } catch (error) {
      toast.error("Some Error Occured !");
      console.log("ERROR OCCURED !", error);
    }
  };

  const singup = async (signUpData) => {
    try {
      const user = await userService.singup(
        signUpData
      );
      if (user.success === true) {
        const { _id, name, email } = user;
        // Store user information in localStorage
        setUser(user);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ _id, name, email })
        );
        toast.success("Successfully Login !", {
          icon: "👏",
          style: {
            width: "15rem",
            color: "white",
            background: "#3FFF00",
          },
        });
        navigate("/home");
      } else {
        if (user.success === false) {
          toast.error(user.message, {
            iconTheme: {
              primary: "#000",
            },
            style: {
              width: "15rem",
              color: "white",
              background: "red",
            },
          });
        }
      }
    } catch (error) {
      toast.error("Some Error Occured !");
      console.log("ERROR OCCURED !", error);
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    navigate("/login");
    toast.success("Logout Successfully !", {
      icon: "👏",
      style: {
        width: "15rem",
        color: "white",
        background: "#3FFF00",
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, singup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);
