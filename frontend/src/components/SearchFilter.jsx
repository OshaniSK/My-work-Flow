/*
  SearchFilter Component
  - Provides a suite of controls to filter and search through tasks.
  - Features:
    * Debounced Search Input: Delays filter updates by 400ms to reduce unnecessary re-renders.
    * Multiple Selects: Priority, Category, and Status filters.
    * Reset Functionality: Clears all filters back to default.
    * Responsiveness: Controls stack on mobile and align horizontally on larger screens.
    * Dark Mode Support: Uses Tailwind dark: classes.
*/

import React, { useState, useEffect } from "react";

const SearchFilter = ({ onFilterChange }) => {
  // --- Filter States ---
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  // --- Debounce Logic for Search ---
  // We use useEffect to watch the 'search' state. 
  // Every time 'search' changes, we start a timer. 
  // If the user types again before 400ms, the previous timer is cleared (cleaned up) 
  // and a new one starts. This ensures onFilterChange is only called after the user stops typing.
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search, priority, category, status });
    }, 400);

    return () => clearTimeout(timer);
  }, [search, priority, category, status, onFilterChange]);

  // --- Reset All Filters ---
  const handleReset = () => {
    setSearch("");
    setPriority("All");
    setCategory("All");
    setStatus("All");
  };

  // Reusable Select Class
  const selectClass = "h-11 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white text-sm cursor-pointer";

  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-4 transition-colors duration-300">
      
      {/* 🔍 Search Input */}
      <div className="relative w-full md:flex-grow">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          type="text"
          placeholder="Search by task title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
        />
      </div>

      {/* Filter Selects Wrapper */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex items-center gap-2 w-full md:w-auto">
        
        {/* Priority Filter */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={selectClass}
        >
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClass}
        >
          <option value="All">All Category</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
          <option value="Other">Other</option>
        </select>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={selectClass}
        >
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        {/* 🔄 Reset Button */}
        <button
          onClick={handleReset}
          className="h-11 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 text-sm col-span-2 sm:col-span-1"
          title="Reset Filters"
        >
          🔄 Reset
        </button>
      </div>

    </div>
  );
};

export default SearchFilter;
