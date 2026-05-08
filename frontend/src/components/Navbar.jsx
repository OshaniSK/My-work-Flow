/*
  Navbar Component
  - Displays the app logo ("MyWorkFlow ✅") on the left.
  - Shows the current page name dynamically in the center using useLocation().
  - Right side includes:
    * User avatar (first letter of username) and username text (hidden on mobile).
    * Dark mode toggle (updates the 'dark' class on the HTML element).
    * Logout button that clears localStorage and redirects to /login.
  - Uses Tailwind CSS for all styling, including dark mode and responsiveness.
*/

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get username from localStorage - defaults to "User" if not set
  const username = localStorage.getItem("username") || "User";
  const userInitial = username.charAt(0).toUpperCase();

  // Initialize dark mode state from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply dark mode class to <html> whenever isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Helper function to get readable page title from current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/tasks") return "Tasks";
    if (path === "/profile") return "Profile";
    if (path === "/add") return "Add Task";
    // Extract ID or name if path is like /edit/123
    if (path.startsWith("/edit")) return "Edit Task";
    return "";
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("theme");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Section: Branding */}
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white flex items-center cursor-default">
              MyWorkFlow <span className="ml-1">✅</span>
            </h1>
          </div>

          {/* Center Section: Dynamic Page Title */}
          <div className="flex-grow flex justify-center px-2">
            <span className="text-sm sm:text-lg font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              {getPageTitle()}
            </span>
          </div>

          {/* Right Section: Actions & Profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {/* User Profile Info */}
            <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-2 sm:pl-4">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-inner select-none">
                {userInitial}
              </div>
              <span className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[100px]">
                {username}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs sm:text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm hover:shadow transition-all active:scale-95"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
