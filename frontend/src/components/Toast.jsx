/*
  Toast.jsx
  - Renders a stacked list of toast notification cards in the bottom-right corner.
  - Each toast:
    * Has a type-specific colored left border and icon.
    * Slides in from the right using CSS translate transitions.
    * Auto-dismissed after 3s (managed by ToastContext).
    * Can be manually dismissed via the X button (calls removeToast).
  - This component is rendered inside ToastProvider, not used directly.
*/

import React, { useState, useEffect } from "react";

// --- Toast Type Configuration ---
// Maps each toast type to its icon, border color, background, and text colors.
const toastConfig = {
  success: {
    icon: "✅",
    border: "border-l-green-500",
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-800 dark:text-green-300",
    iconBg: "bg-green-100 dark:bg-green-900/40",
  },
  error: {
    icon: "❌",
    border: "border-l-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    text: "text-red-800 dark:text-red-300",
    iconBg: "bg-red-100 dark:bg-red-900/40",
  },
  info: {
    icon: "ℹ️",
    border: "border-l-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-300",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
  },
  warning: {
    icon: "⚠️",
    border: "border-l-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    text: "text-yellow-800 dark:text-yellow-300",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/40",
  },
};

// --- Individual ToastItem Sub-component ---
// Handles the slide-in animation independently for each toast.
const ToastItem = ({ toast, removeToast }) => {
  // Start as hidden (translated off-screen to the right), animate to visible
  const [visible, setVisible] = useState(false);

  // Trigger slide-in on mount via a tiny delay to allow CSS transition to play
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 20);
    return () => clearTimeout(timer);
  }, []);

  const config = toastConfig[toast.type] || toastConfig.info;

  return (
    <div
      className={`flex items-start space-x-3 w-80 p-4 rounded-xl shadow-lg border-l-4 ${config.border} ${config.bg} transition-all duration-300 ease-out ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      role="alert"
    >
      {/* Icon Badge */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${config.iconBg} flex items-center justify-center text-base`}>
        {config.icon}
      </div>

      {/* Message Text */}
      <p className={`flex-grow text-sm font-medium leading-snug ${config.text}`}>
        {toast.message}
      </p>

      {/* Manual Dismiss (X) Button */}
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors text-lg leading-none"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
};

// --- Toast Container Component ---
// Positioned fixed in the bottom-right corner.
// Renders a stacked list of all active ToastItem components.
const Toast = ({ toasts, removeToast }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col space-y-3"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  );
};

export default Toast;
