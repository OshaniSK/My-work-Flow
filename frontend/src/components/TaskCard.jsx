/*
  TaskCard Component
  - Displays individual task details in a clean card layout.
  - Features:
    * Conditional styling for completed and overdue tasks.
    * Priority-based color badges.
    * Category pill tags.
    * Action buttons for editing, deleting, and toggling completion status.
    * Date formatting and text truncation.
*/

import React from "react";

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const { title, description, dueDate, priority, category, completed } = task;

  // --- Date Formatting ---
  const formatDate = (dateString) => {
    if (!dateString) return "No date set";
    const options = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  // --- Logic for Status Indicators ---
  const isOverdue = dueDate && new Date(dueDate) < new Date().setHours(0, 0, 0, 0) && !completed;

  // --- Priority Styling Logic ---
  const getPriorityClasses = (p) => {
    switch (p) {
      case "High":
        return "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Low":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  return (
    <div
      className={`relative group bg-white dark:bg-slate-900 p-5 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${
        completed ? "opacity-60 grayscale-[0.5]" : "opacity-100"
      } ${
        isOverdue 
          ? "border-red-400 dark:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]" 
          : "border-slate-100 dark:border-slate-800"
      }`}
    >
      {/* Top Row: Category & Priority */}
      <div className="flex justify-between items-center mb-3">
        <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400 rounded-full">
          {category}
        </span>
        <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${getPriorityClasses(priority)}`}>
          {priority} Priority
        </span>
      </div>

      {/* Task Content */}
      <div className="mb-4">
        <h3 className={`text-lg font-bold text-slate-800 dark:text-white mb-1 transition-all ${completed ? "line-through text-slate-400" : ""}`}>
          {title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {description || "No description provided."}
        </p>
      </div>

      {/* Footer: Date & Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-50 dark:border-slate-800">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium uppercase">Due Date</span>
          <span className={`text-xs font-semibold ${isOverdue ? "text-red-500" : "text-slate-600 dark:text-slate-300"}`}>
            {formatDate(dueDate)}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Complete Toggle Button */}
          <button
            onClick={() => onToggleComplete(task)}
            className={`p-2 rounded-lg transition-colors ${
              completed 
                ? "bg-green-500 text-white" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-green-500"
            }`}
            title={completed ? "Mark as Pending" : "Mark as Complete"}
          >
            ✅
          </button>

          {/* Edit Button */}
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-indigo-500 transition-colors"
            title="Edit Task"
          >
            ✏️
          </button>

          {/* Delete Button */}
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) {
                onDelete(task._id);
              }
            }}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-red-500 transition-colors"
            title="Delete Task"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Overdue Glow Overlay (Subtle) */}
      {isOverdue && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-red-500/20"></div>
      )}
    </div>
  );
};

export default TaskCard;
