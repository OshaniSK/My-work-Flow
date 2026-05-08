/*
  axiosConfig.js — Global Axios Instance
  - Base URL points to the backend API at http://localhost:5000/api
  - Request Interceptor: reads the JWT token from localStorage and injects it
    into every outgoing request as "Authorization: Bearer <token>".
  - Response Interceptor: catches 401 Unauthorized responses (expired/invalid token)
    and automatically redirects the user to /login, clearing the stale token.
*/

import axios from "axios";

// Create a configured Axios instance with the backend base URL
const axiosConfig = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request Interceptor ──
// Runs before every request is sent.
// Reads the JWT token from localStorage and attaches it to the Authorization header.
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ── Response Interceptor ──
// Runs after every response is received.
// On a 401 Unauthorized error: clears the invalid token and redirects to /login.
// Using window.location.href instead of useNavigate because this is outside React.
axiosConfig.interceptors.response.use(
  (response) => response, // Pass through successful responses unchanged
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid — clear storage and force re-login
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;
