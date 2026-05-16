import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired/invalid tokens globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      // Clear all authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");

      // Notify other tabs/components that auth state changed
      window.dispatchEvent(new Event("storage"));

      // Decide where to redirect
      const isAdminRoute =
        window.location.pathname.startsWith("/admin");

      const redirectTo = isAdminRoute
        ? "/admin/login"
        : "/login";

      // Prevent infinite redirect loop
      if (window.location.pathname !== redirectTo) {
        window.location.href = redirectTo;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;