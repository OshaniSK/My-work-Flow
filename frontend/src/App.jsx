/*
  App.jsx
  - Root application component. Sets up React Router and the protected layout.
  - PrivateRoute: reads localStorage for a JWT token. If missing → redirect to /login.
  - ProtectedLayout: renders Navbar + Sidebar + page content for authenticated users.
  - The outer wrapper div reads the 'dark' class from <html> (set by Navbar's toggle).
  - ToastProvider is in main.jsx (already wrapping this component).
*/

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Auth Pages (public)
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Protected Pages
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import CompletedPage from "./pages/CompletedPage";
import PendingPage from "./pages/PendingPage";
import SettingsPage from "./pages/SettingsPage";

// ─────────────────────────────────────────────────────────
// PrivateRoute Component
// Checks if a JWT token exists in localStorage.
// • Token found  → renders the requested page (via <Outlet />)
// • Token missing → redirects to /login
// ─────────────────────────────────────────────────────────
const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// ─────────────────────────────────────────────────────────
// ProtectedLayout Component
// Shared layout for all authenticated pages.
// Renders: sticky Navbar on top + Sidebar on left + page content on right.
// ─────────────────────────────────────────────────────────
const ProtectedLayout = () => {
  return (
    // min-h-screen ensures the layout fills the full viewport height
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Sticky top navigation bar */}
      <Navbar />

      {/* Main content area: sidebar + page */}
      <div className="flex">
        {/* Fixed left sidebar (includes its own spacer div for desktop layout) */}
        <Sidebar />

        {/* Page content — grows to fill remaining horizontal space */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {/* <Outlet /> renders whichever child route is currently active */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────
// App Component — Route Configuration
// ─────────────────────────────────────────────────────────
const App = () => {
  return (
    <Router>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/login"    element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ── Protected Routes ── */}
        {/* PrivateRoute checks the token; ProtectedLayout wraps with Navbar+Sidebar */}
        <Route element={<PrivateRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard"        element={<DashboardPage />} />
            <Route path="/tasks"            element={<TasksPage />} />
            <Route path="/tasks/completed"  element={<CompletedPage />} />
            <Route path="/tasks/pending"    element={<PendingPage />} />
            <Route path="/settings"         element={<SettingsPage />} />
          </Route>
        </Route>

        {/* ── Fallback: redirect any unknown path to /dashboard ── */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
