// File: frontend/src/pages/Dashboard.jsx

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Placeholder TaskCard for layout
const TaskCard = ({ task }) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
    <h3 className="font-bold text-gray-900 dark:text-white truncate">{task.title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 min-h-[40px]">{task.description}</p>
    <div className="mt-4 flex items-center justify-between">
      <div className="flex gap-2">
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
          task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
        }`}>
          {task.priority}
        </span>
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
          task.status === 'done' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300' :
          task.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
        }`}>
          {task.status.replace('-', ' ')}
        </span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState("all");
  
  // Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Modal State
  const [showModal, setShowModal] = useState(false);

  // Placeholder Tasks Data (will be replaced by Context)
  const tasks = [
    { id: 1, title: "Review pull requests", description: "Review and merge the pending PRs for the authentication flow.", priority: "high", status: "todo" },
    { id: 2, title: "Update documentation", description: "Write README instructions for local setup.", priority: "medium", status: "in-progress" },
    { id: 3, title: "Fix layout bugs", description: "Address the responsive design issues on mobile devices.", priority: "high", status: "done" },
    { id: 4, title: "Plan sprint", description: "Organize next week's tickets.", priority: "low", status: "todo" },
  ];

  // Apply filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    
    // Simple tab logic
    let matchesTab = true;
    if (activeTab === "high" && task.priority !== "high") matchesTab = false;
    if (activeTab === "completed" && task.status !== "done") matchesTab = false;
    
    return matchesSearch && matchesPriority && matchesStatus && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex font-sans transition-colors">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 ml-60 flex flex-col">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="flex-1 pt-16 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 capitalize">
              {activeTab === 'all' ? 'All Tasks' : activeTab === 'high' ? 'High Priority' : activeTab}
            </h1>

            {/* Filter Bar */}
            <div className="mb-8 flex flex-wrap gap-6 items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Priority:</span>
                <div className="flex gap-2">
                  {["all", "low", "medium", "high"].map(p => (
                    <button
                      key={p}
                      onClick={() => setFilterPriority(p)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                        filterPriority === p
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Status:</span>
                <div className="flex gap-2">
                  {["all", "todo", "in-progress", "done"].map(s => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                        filterStatus === s
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {s.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => <TaskCard key={task.id} task={task} />)
              ) : (
                <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                  <span className="text-4xl mb-4">📭</span>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">No tasks found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center text-2xl shadow-lg transition-transform hover:scale-105 z-20 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
        title="Create New Task"
      >
        +
      </button>

      {/* Placeholder AddTaskModal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create New Task</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Modal form will go here...</p>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
