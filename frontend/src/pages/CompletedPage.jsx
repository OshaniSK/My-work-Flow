// src/pages/CompletedPage.jsx — shows only completed tasks
import React from "react";
const CompletedPage = () => (
  <div>
    <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">✅ Completed Tasks</h1>
    <p className="text-slate-500 dark:text-slate-400">Filter tasks where completed === true and render TaskList here.</p>
  </div>
);
export default CompletedPage;
