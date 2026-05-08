/*
  DashboardCards Component
  - Renders a responsive grid of 4 summary statistics cards.
  - Sub-component: StatCard (reusable for different stats).
  - Calculates and displays a task completion progress percentage with a mini bar.
  - Layout: 1 col (mobile), 2 cols (tablet), 4 cols (desktop).
  - Styling: Tailwind CSS with dark mode support and hover animations.
*/

import React from "react";

/**
 * Reusable StatCard Sub-component
 * @param {string} icon - Emoji or icon representation
 * @param {string} label - Title of the statistic
 * @param {number|string} value - The actual number to display
 * @param {string} colorClass - Tailwind color classes for the icon background
 * @param {React.ReactNode} children - Optional extra content like progress bars
 */
const StatCard = ({ icon, label, value, colorClass, children }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 dark:bg-opacity-20 group-hover:scale-110 transition-transform`}>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
    <div>
      <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</h3>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-slate-800 dark:text-white">{value}</span>
      </div>
      {children}
    </div>
  </div>
);

const DashboardCards = ({ totalTasks = 0, completedTasks = 0, pendingTasks = 0 }) => {
  // Calculate progress percentage safely
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      
      {/* 1. Total Tasks Card */}
      <StatCard
        icon="📋"
        label="Total Tasks"
        value={totalTasks}
        colorClass="bg-blue-500 text-blue-600 dark:text-blue-400"
      />

      {/* 2. Completed Tasks Card */}
      <StatCard
        icon="✅"
        label="Completed"
        value={completedTasks}
        colorClass="bg-green-500 text-green-600 dark:text-green-400"
      />

      {/* 3. Pending Tasks Card */}
      <StatCard
        icon="⏳"
        label="Pending"
        value={pendingTasks}
        colorClass="bg-yellow-500 text-yellow-600 dark:text-yellow-400"
      />

      {/* 4. Progress Percentage Card with Mini Bar */}
      <StatCard
        icon="📊"
        label="Progress"
        value={`${progress}%`}
        colorClass="bg-purple-500 text-purple-600 dark:text-purple-400"
      >
        <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-purple-500 h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </StatCard>

    </div>
  );
};

export default DashboardCards;
