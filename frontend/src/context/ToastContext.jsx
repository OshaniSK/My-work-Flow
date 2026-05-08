/*
  ToastContext.jsx
  - Implements the React Context pattern to provide a global toast notification system.
  - How it works:
    1. ToastProvider wraps the app and holds a 'toasts' array in state.
    2. showToast() creates a new toast object with a unique ID (Date.now()) and
       appends it to the array.
    3. A setTimeout auto-removes the toast after 3000ms by filtering it out by ID.
    4. removeToast() allows manual removal (triggered by the X button in Toast.jsx).
    5. useToast() is a custom hook that reads from the context — components call
       this instead of importing the context object directly.

  Usage:
    const { showToast } = useToast();
    showToast("Task created!", "success");
    showToast("Something went wrong", "error");
    showToast("3 tasks due today", "info");
    showToast("Action cannot be undone", "warning");
*/

import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/Toast";

// --- Create the Context ---
// The initial value is null; it gets populated by ToastProvider.
const ToastContext = createContext(null);

// --- ToastProvider Component ---
// Wraps the entire app (in main.jsx or App.jsx) so any component
// inside can access showToast via the useToast() hook.
export const ToastProvider = ({ children }) => {
  // State: an array of toast objects { id, message, type }
  const [toasts, setToasts] = useState([]);

  // --- Add Toast ---
  // Creates a new toast and adds it to the array.
  // useCallback memoizes this so it's stable across renders
  // (prevents unnecessary re-renders in consumers).
  const showToast = useCallback((message, type = "info") => {
    const id = Date.now(); // Unique ID using current timestamp

    // Append the new toast to the existing list
    setToasts((prev) => [...prev, { id, message, type }]);

    // --- Auto-Dismiss Logic ---
    // After 3 seconds, remove this specific toast by filtering it out by ID.
    // This doesn't affect other toasts that may have been added since.
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  // --- Manual Remove Toast ---
  // Called when the user clicks the X button on a toast.
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    // Provide showToast and removeToast to all child components
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast container is rendered here so it's always available globally */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// --- useToast Custom Hook ---
// Encapsulates context access. Throws a helpful error if used outside the provider.
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a <ToastProvider>.");
  }
  return context;
};
