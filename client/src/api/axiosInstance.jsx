import axios from "axios";
import { toast } from "react-toastify";
// import { APP_URL } from "../main";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1", // use the same URL as defined in your index.js
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      // Network or server error
      toast.error("Server is down or network error. Please try again later.");
    } else {
      // Handle other errors
      toast.error(error.response.data.message || "An error occurred.");
    }
    return Promise.reject(error);
  }
);
