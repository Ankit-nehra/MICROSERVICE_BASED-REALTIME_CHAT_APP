import axios from "axios";
import useAuthStore from "../store/auth.store";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {

      useAuthStore.getState().logout();

      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export default api;