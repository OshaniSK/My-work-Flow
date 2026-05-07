// File: frontend/src/context/TaskContext.jsx

import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axios";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/tasks");
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const response = await axiosInstance.post("/api/tasks", taskData);
      setTasks([response.data, ...tasks]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to add task" };
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await axiosInstance.put(`/api/tasks/${id}`, taskData);
      setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to update task" };
    }
  };

  const deleteTask = async (id) => {
    try {
      await axiosInstance.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to delete task" };
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
