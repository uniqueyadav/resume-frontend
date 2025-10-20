// src/api.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "https://resume-backend-omega.vercel.app/api";

// const axiosInstance = axios.create({
//   baseURL: API_BASE,
// });

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
