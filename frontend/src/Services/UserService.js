import axios from "axios";

export const login = async (loginData) => {
  try {
    const { data } = await axios.post(
      "api/user/login",
      loginData
    );
    console.log("Login Frontend API ==> ", data);
    return data;
  } catch (error) {
    // console.log("Login API error Frontend:", error.response.data);
    return error.response.data;
  }
};

export const singup = async (signUpData) => {
  try {
    const { data } = await axios.post(
      "api/user/signup",
      signUpData
    );
    console.log("SignUp Frontend API ==> ", data);
    return data;
  } catch (error) {
    // console.log("SignUp API error Frontend:", error.response.data);
    return error.response.data;
  }
};

export const ProfileUpdate = async (formData) => {
  try {
    const { data } = await axios.put(
      "api/user/profileUpdate",
      formData
    );
    console.log(
      "Update Profile Frontend API Hit ==> ",
      data
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAll = async () => {
  try {
    const { data } = await axios.get(
      "api/user/all"
    );
    console.log(data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteUser = async (id) => {
  try {
    console.log(id);
    const { data } = await axios.delete(
      `api/user/delete/${id} `
    );
    console.log("user ==> ", data);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUser = () =>
  localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

export const logout = () => {
  localStorage.removeItem("userInfo");
};
