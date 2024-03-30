import axios from "axios";

axios.interceptors.request.use(
  (req) => {
    const user =
      localStorage.getItem("userInfo");
    const token =
      user && JSON.parse(user).token;
    // console.log("token => " , token)

    if (token) {
      req.headers["access_token"] = token;
    }

    return req;
  },

  (error) => {
    return Promise.reject(error);
  }
);
