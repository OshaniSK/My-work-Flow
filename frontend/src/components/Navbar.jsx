// File: frontend/src/components/Navbar.jsx

import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark" || 
           (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <header className="fixed top-0 right-0 left-60 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10 flex items-center justify-between px-6 transition-colors shadow-sm">
      <div className="flex-1 flex justify-center lg:justify-start lg:pl-8">
        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
      <div className="ml-4 flex items-center space-x-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
