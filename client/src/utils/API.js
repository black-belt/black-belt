import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("blackbelt_token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use((config) => {
  return config.data;
});
export default axiosInstance;
