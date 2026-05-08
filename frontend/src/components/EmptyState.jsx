/*
  EmptyState Component
  - Displayed when the task list is empty.
  - Encourages the user to add their first task.
  - Supports dark mode.
*/

import React from "react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-5xl">
        📭
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        No tasks found
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
        Your task list is empty. Click the "Add Task" button to get started with your workflow!
      </p>
    </div>
  );
};

export default EmptyState;
