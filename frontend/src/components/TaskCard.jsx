// File: frontend/src/components/TaskCard.jsx

import { useState } from "react";

const TaskCard = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task._id);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) return;
    const res = await onUpdate(task._id, formData);
    if (res?.success !== false) {
      setIsEditing(false);
    }
  };

  const priorityStyles = {
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  };

  const statusStyles = {
    done: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    todo: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Title (required)"
          required
        />
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Description"
          rows="2"
        />
        <div className="flex gap-3 mb-3">
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all relative">
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-1.5 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 bg-gray-50 hover:bg-indigo-50 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
          title="Edit Task"
        >
          ✏️
        </button>
        <button
          onClick={handleDelete}
          className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 bg-gray-50 hover:bg-red-50 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
          title="Delete Task"
        >
          🗑️
        </button>
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white pr-16 truncate">{task.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 min-h-[40px]">
        {task.description}
      </p>

      {task.dueDate && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
          📅 {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
              priorityStyles[task.priority] || priorityStyles.medium
            }`}
          >
            {task.priority}
          </span>
          <span
            className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
              statusStyles[task.status] || statusStyles.todo
            }`}
          >
            {task.status.replace("-", " ")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
