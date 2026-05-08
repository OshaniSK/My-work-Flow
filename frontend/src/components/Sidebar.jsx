/*
  Sidebar Component
  - Provides main navigation for the application using React Router's NavLink.
  - Desktop: A fixed vertical sidebar with a width of 64 (w-64).
  - Mobile: A slide-in drawer toggled by a hamburger menu icon in the top-left.
  - Features:
    * Highlighted active links with conditional Tailwind classes.
    * Smooth slide-in/out animations using CSS transitions.
    * Dark mode support with dark: classes.
    * Auto-closes on mobile when a link is clicked.
*/

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // State to manage mobile drawer visibility
  const [isOpen, setIsOpen] = useState(false);

  // Navigation configuration for easy updates
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "All Tasks", path: "/tasks", icon: "📋" },
    { name: "Completed", path: "/tasks/completed", icon: "✅" },
    { name: "Pending", path: "/tasks/pending", icon: "⏳" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  // Logic to determine Tailwind classes for NavLinks based on active state
  const getLinkClass = ({ isActive }) =>
    `flex items-center space-x-4 p-3 rounded-xl transition-all duration-200 group ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none font-bold scale-105"
        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:pl-5"
    }`;

  // Toggle mobile drawer
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Hamburger Button - Visible only on small screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 lg:hidden shadow-md active:scale-90 transition-transform"
        aria-label="Toggle Menu"
      >
        <span className="text-xl block w-6 text-center">
          {isOpen ? "✕" : "☰"}
        </span>
      </button>

      {/* Mobile Backdrop - Dims background when drawer is active */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-5">
          
          {/* Sidebar Brand/Header */}
          <div className="mb-10 pt-4 px-2">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Main Navigation
            </h2>
          </div>

          {/* Navigation Link List */}
          <nav className="flex-grow space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={getLinkClass}
                onClick={() => setIsOpen(false)} // Auto-close drawer on mobile
              >
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="text-sm tracking-wide">{item.name}</span>
              </NavLink>
            ))}
          </nav>

          {/* Sidebar Footer Info */}
          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl text-center">
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                MY WORKFLOW v1.0
              </p>
            </div>
          </div>

        </div>
      </aside>

      {/* Layout Spacer - Reserves space on desktop so content isn't hidden under sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0"></div>
    </>
  );
};

export default Sidebar;
