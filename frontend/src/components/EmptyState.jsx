/*
  EmptyState Component
  - A flexible, prop-driven component used to display a placeholder when no data is available.
  - Flexibility:
    * Custom Emoji: Pulse-animated icon to represent the state (e.g., search, completed tasks).
    * Dynamic Text: Customizable title and message for different contexts.
    * Optional Action: Includes a button to trigger a specific action (like opening a task form).
  - Styling: Tailwind CSS with dark mode support and centered layout.
*/

import React from "react";

const EmptyState = ({ 
  emoji = "📭", 
  title = "Nothing here yet", 
  message = "Add something to get started.", 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-[fadeIn_0.6s_ease-out]">
      
      {/* Pulse Animated Emoji Illustration */}
      <div className="mb-6 relative">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-5xl shadow-inner animate-pulse">
          {emoji}
        </div>
        {/* Subtle decorative ring */}
        <div className="absolute inset-0 rounded-full border-2 border-slate-50 dark:border-slate-900 scale-125 opacity-50"></div>
      </div>

      {/* Text Content */}
      <div className="max-w-xs mx-auto mb-8">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
          {message}
        </p>
      </div>

      {/* Optional Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 group"
        >
          <span className="group-hover:rotate-90 transition-transform duration-300">＋</span>
          <span>{actionLabel}</span>
        </button>
      )}

    </div>
  );
};

export default EmptyState;
