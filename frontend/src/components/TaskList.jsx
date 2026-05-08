/*
  TaskList Component
  - Renders a responsive grid of TaskCard components.
  - Features:
    * Sorting: Incomplete tasks first, followed by due date (ascending).
    * Responsive Grid: 1 col (mobile), 2 cols (tablet), 3 cols (desktop).
    * Animation: Staggered fade-in effect for each card.
    * States: Integrated Loader and EmptyState components.
*/

import React from "react";
import TaskCard from "./TaskCard";
import EmptyState from "./EmptyState";
import Loader from "./Loader";

const TaskList = ({ tasks = [], isLoading = false, onEdit, onDelete, onToggleComplete }) => {
  
  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );
  }

  // --- Empty State ---
  if (!tasks || tasks.length === 0) {
    return <EmptyState />;
  }

  // --- Sorting Logic ---
  // 1. Uncompleted tasks come first.
  // 2. Both groups are sorted by due date (nearest first).
  const sortedTasks = [...tasks].sort((a, b) => {
    // If one is completed and the other isn't, uncompleted comes first
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // If both have the same completion status, sort by due date ascending
    const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
    return dateA - dateB;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sortedTasks.map((task, index) => (
        <div 
          key={task._id || index} 
          // Staggered fade-in animation using arbitrary Tailwind values
          // Note: fadeIn keyframe should be defined in global CSS or Tailwind config
          className="animate-[fadeIn_0.4s_ease-out_forwards] opacity-0"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <TaskCard 
            task={task} 
            onEdit={onEdit} 
            onDelete={onDelete} 
            onToggleComplete={onToggleComplete} 
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
