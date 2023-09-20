import axios from "axios";

export const newRequest = axios.create({
  baseURL: "https://mern-server-pgto.onrender.com/api",
  withCredentials: true,
});
