import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const addUser = async (userData) => {
  return await axios.post("http://localhost:5000/api/auth/register", userData);
};

export const loginUser = async (userData) => {
  return await axios.post("http://localhost:5000/api/auth/login", userData,{
    withCredentials:true
  });
};

export const logoutUser = async () => {
  return await axios.post("http://localhost:5000/api/auth/logout",{},{
    withCredentials:true
  });
};
