// File: frontend/src/context/AuthContext.jsx

import { createContext, useState } from "react";
import axiosInstance from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage so auth persists across page refreshes
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  // ── Register ────────────────────────────────────────────────────────────────
  const register = async (name, email, password) => {
    const response = await axiosInstance.post("/api/auth/register", {
      name,
      email,
      password,
    });

    const userData = {
      _id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      token: response.data.token,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    setUser(userData);
    return userData;
  };

  // ── Login ───────────────────────────────────────────────────────────────────
  const login = async (email, password) => {
    const response = await axiosInstance.post("/api/auth/login", {
      email,
      password,
    });

    const userData = {
      _id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      token: response.data.token,
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    setUser(userData);
    return userData;
  };

  // ── Logout ──────────────────────────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
