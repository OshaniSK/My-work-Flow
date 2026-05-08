// src/pages/PendingPage.jsx — shows only pending (not completed) tasks
import React from "react";
const PendingPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">⏳ Pending Tasks</h1>
    <p className="text-slate-500 dark:text-slate-400">Filter tasks where completed === false and render TaskList here.</p>
  </div>
);
export default PendingPage;
