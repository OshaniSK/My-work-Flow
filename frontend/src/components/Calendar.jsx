/*
  Calendar Component
  - A fully custom monthly calendar built from scratch with React and Tailwind CSS.
  - No external calendar library used.
  
  KEY CALENDAR MATH EXPLAINED:
  1. First Day Offset:
     new Date(year, month, 1).getDay() → returns 0 (Sun) to 6 (Sat)
     This tells us how many blank cells to render before day 1.
  
  2. Days In Month:
     new Date(year, month + 1, 0).getDate() → Day 0 of the NEXT month
     is the last day of the CURRENT month. e.g., May has 31 days.
  
  3. Grid Construction:
     We build a flat array of cells = [blanks... + day numbers...]
     Then render it in a 7-column CSS grid.
  
  4. Task Mapping:
     Tasks are grouped by their dueDate (YYYY-MM-DD key) into a Map.
     On each day cell, we look up that date key to get relevant tasks.
  
  5. Popover:
     Clicking a day sets selectedDay state. A panel renders below the
     grid showing tasks for that day. Clicking the same day again hides it.
*/

import React, { useState, useMemo } from "react";

// --- Constants ---
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// --- Priority Dot Color Map ---
const priorityDot = {
  High:   "bg-red-500",
  Medium: "bg-yellow-400",
  Low:    "bg-green-500",
};

// --- Priority Badge Classes for Popover ---
const priorityBadge = {
  High:   "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  Medium: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  Low:    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
};

const Calendar = ({ tasks = [] }) => {
  const today = new Date();

  // --- Navigation State ---
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0-indexed

  // --- Selected Day State (for popover) ---
  const [selectedDay, setSelectedDay] = useState(null); // { day, dateKey }

  // --- Navigate Months ---
  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDay(null); // Close popover on navigation
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDay(null);
  };

  // --- Calendar Grid Math ---
  // firstDayOfWeek: 0 (Sun) to 6 (Sat) — tells us how many blank leading cells to render
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  // daysInMonth: total number of days in the current month (28–31)
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // --- Build Task Map ---
  // Groups tasks by their dueDate (formatted as "YYYY-MM-DD") for O(1) lookup per cell.
  const taskMap = useMemo(() => {
    const map = {};
    tasks.forEach((task) => {
      if (!task.dueDate) return;
      // Normalize date to YYYY-MM-DD key
      const dateKey = task.dueDate.split("T")[0];
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(task);
    });
    return map;
  }, [tasks]);

  // Helper: build a "YYYY-MM-DD" key for a given day number in current view
  const buildDateKey = (day) => {
    const mm = String(currentMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${currentYear}-${mm}-${dd}`;
  };

  // Helper: check if a given day number is today
  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  // --- Toggle Day Popover ---
  const handleDayClick = (day) => {
    const dateKey = buildDateKey(day);
    if (selectedDay?.dateKey === dateKey) {
      setSelectedDay(null); // Click same day = close
    } else {
      setSelectedDay({ day, dateKey });
    }
  };

  // --- Build Grid Cells Array ---
  // Array of null (blank leading cells) + day numbers (1 to daysInMonth)
  const gridCells = [
    ...Array(firstDayOfWeek).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Determine tasks for the selected popover day
  const selectedDayTasks = selectedDay ? (taskMap[selectedDay.dateKey] || []) : [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">

      {/* ── Calendar Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={goToPrevMonth}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-90 text-slate-600 dark:text-slate-300 font-bold"
          aria-label="Previous month"
        >
          ‹
        </button>

        <h2 className="text-base font-bold text-slate-800 dark:text-white tracking-tight">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h2>

        <button
          onClick={goToNextMonth}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors active:scale-90 text-slate-600 dark:text-slate-300 font-bold"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="p-4">
        {/* ── Day-of-Week Labels ── */}
        <div className="grid grid-cols-7 mb-2">
          {DAY_NAMES.map((name) => (
            <div
              key={name}
              className="text-center text-[10px] sm:text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest py-1"
            >
              {name}
            </div>
          ))}
        </div>

        {/* ── Day Cells Grid ── */}
        {/* Each cell is: blank (null) or a day number with task dots */}
        <div className="grid grid-cols-7 gap-y-1">
          {gridCells.map((day, index) => {
            if (day === null) {
              // Blank leading cell for days before the 1st
              return <div key={`blank-${index}`} />;
            }

            const dateKey = buildDateKey(day);
            const dayTasks = taskMap[dateKey] || [];
            const isSelected = selectedDay?.dateKey === dateKey;
            const todayFlag = isToday(day);
            // Show max 3 priority dots, remainder shown as "+N more"
            const visibleDots = dayTasks.slice(0, 3);
            const extraCount = dayTasks.length - visibleDots.length;

            return (
              <div
                key={dateKey}
                onClick={() => handleDayClick(day)}
                className={`relative flex flex-col items-center py-1 rounded-xl cursor-pointer transition-all duration-150 group
                  ${isSelected ? "bg-indigo-50 dark:bg-indigo-900/20 ring-1 ring-indigo-400" : "hover:bg-slate-50 dark:hover:bg-slate-800/60"}
                `}
              >
                {/* Day Number — highlighted if today */}
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition-colors
                    ${todayFlag
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                      : "text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                    }
                  `}
                >
                  {day}
                </span>

                {/* Task Priority Dots */}
                {dayTasks.length > 0 && (
                  <div className="flex items-center justify-center gap-0.5 mt-0.5 flex-wrap">
                    {visibleDots.map((task, i) => (
                      <span
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${priorityDot[task.priority] || "bg-slate-400"}`}
                      />
                    ))}
                    {extraCount > 0 && (
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 leading-none font-bold">
                        +{extraCount}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Day Popover Panel ── */}
      {/* Shows below the grid when a day is clicked */}
      {selectedDay && (
        <div className="border-t border-slate-100 dark:border-slate-800 px-5 py-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {MONTH_NAMES[currentMonth]} {selectedDay.day}, {currentYear}
            </h3>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              ✕ Close
            </button>
          </div>

          {selectedDayTasks.length === 0 ? (
            <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2 text-center">
              No tasks due on this day.
            </p>
          ) : (
            <ul className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {selectedDayTasks.map((task) => (
                <li
                  key={task._id}
                  className="flex items-start justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800"
                >
                  <span className={`text-xs font-medium leading-snug ${task.completed ? "line-through text-slate-400" : "text-slate-700 dark:text-slate-200"}`}>
                    {task.title}
                  </span>
                  <span className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityBadge[task.priority] || ""}`}>
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

    </div>
  );
};

export default Calendar;
