/*
  TaskForm Component
  - A controlled form for creating or updating tasks.
  - Fields: Title, Description, Due Date, Priority, and Category.
  - Features:
    * Inline validation for required fields and past dates.
    * Edit mode support via initialData prop.
    * Loading state support for the submit button.
    * Tailwind CSS styling with dark mode integration.
*/

import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, initialData = {}, isLoading = false }) => {
  // --- Form State ---
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Medium",
    category: "Work",
  });

  // --- Validation State ---
  const [errors, setErrors] = useState({});

  // Effect to pre-fill the form if initialData is provided (for edit mode)
  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        dueDate: initialData.dueDate ? initialData.dueDate.split("T")[0] : "",
        priority: initialData.priority || "Medium",
        category: initialData.category || "Work",
      });
    }
  }, [initialData]);

  // Handle input changes for all controlled inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // --- Form Validation Logic ---
  const validate = () => {
    const newErrors = {};
    const today = new Date().setHours(0, 0, 0, 0);

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required.";
    }

    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate).getTime();
      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      // Reset form if it's not edit mode
      if (!initialData._id) {
        setFormData({
          title: "",
          description: "",
          dueDate: "",
          priority: "Medium",
          category: "Work",
        });
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
        {initialData._id ? "Update Task" : "Add New Task"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className={`w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
              errors.title ? "border-red-500" : "border-slate-200 dark:border-slate-700"
            } focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional details..."
            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Due Date Picker */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border ${
                errors.dueDate ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white`}
            />
            {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
          </div>

          {/* Priority Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white appearance-none"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white appearance-none"
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <span>{initialData._id ? "Update Task" : "Add Task"}</span>
          )}
        </button>

      </form>
    </div>
  );
};

export default TaskForm;
