import axios from "axios";

const axiosImage = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

axiosImage.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("blackbelt_token"));
  if (token) {
    config.headers.Authorization = `${token.accessToken}`;
  }
  return config;
});

axiosImage.interceptors.response.use((config) => {
  return config.data;
});
export default axiosImage;
