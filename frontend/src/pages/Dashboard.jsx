// File: frontend/src/pages/Dashboard.jsx

import { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import AddTaskModal from "../components/AddTaskModal";
import { TaskContext } from "../context/TaskContext";

const Dashboard = () => {
  // Navigation State
  const [activeTab, setActiveTab] = useState("all");
  
  // Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Modal State
  const [showModal, setShowModal] = useState(false);

  // Consume TaskContext
  const { tasks, loading, error, addTask, updateTask, deleteTask } = useContext(TaskContext);

  // Apply filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    const matchesStatus = filterStatus === "all" || task.status === filterStatus;
    
    // Tab logic
    let matchesTab = true;
    if (activeTab === "high" && task.priority !== "high") matchesTab = false;
    if (activeTab === "completed" && task.status !== "done") matchesTab = false;
    if (activeTab === "today") {
      const today = new Date().toISOString().split("T")[0];
      if (!task.dueDate || task.dueDate.split("T")[0] !== today) matchesTab = false;
    }
    
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

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}

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
            {loading ? (
              <div className="flex justify-center py-20 text-indigo-600">
                <p className="text-lg font-medium animate-pulse">Loading tasks...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map(task => (
                    <TaskCard 
                      key={task._id} 
                      task={task} 
                      onDelete={deleteTask} 
                      onUpdate={updateTask} 
                    />
                  ))
                ) : (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <span className="text-4xl mb-4">📭</span>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No tasks found matching your filters.</p>
                  </div>
                )}
              </div>
            )}
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

      {/* Add Task Modal */}
      {showModal && (
        <AddTaskModal 
          onClose={() => setShowModal(false)} 
          onAdd={addTask} 
        />
      )}
    </div>
  );
};

export default Dashboard;
