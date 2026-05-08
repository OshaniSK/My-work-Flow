/*
  Loader Component
  - A simple centered loading spinner with pulse effect.
  - Supports dark mode.
*/

import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-indigo-200 dark:border-slate-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 animate-pulse">
        Loading tasks...
      </p>
    </div>
  );
};

export default Loader;
