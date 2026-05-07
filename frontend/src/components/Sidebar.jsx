// File: frontend/src/components/Sidebar.jsx

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { id: "all", label: "All Tasks", icon: "📋" },
    { id: "today", label: "Today", icon: "☀️" },
    { id: "high", label: "High Priority", icon: "🚀" },
    { id: "completed", label: "Completed", icon: "✅" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-60 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between z-20 transition-colors">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-2">
          <span>✨</span> My-Work-Flow
        </h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                activeTab === item.id
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                  : "text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              {user?.name || "User"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            title="Logout"
          >
            🚪
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
