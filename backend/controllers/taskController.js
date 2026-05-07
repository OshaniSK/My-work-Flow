// File: backend/controllers/taskController.js

const asyncHandler = require("express-async-handler");
const Task = require("../models/Task");

// ── @desc    Get all tasks for the logged-in user
// ── @route   GET /api/tasks
// ── @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json(tasks);
});

// ── @desc    Create a new task
// ── @route   POST /api/tasks
// ── @access  Private
const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Please provide a task title");
  }

  const task = await Task.create({
    title,
    description: description || "",
    priority: priority || "medium",
    status: status || "todo",
    dueDate: dueDate || null,
    user: req.user._id,
  });

  res.status(201).json(task);
});

// ── @desc    Update a task
// ── @route   PUT /api/tasks/:id
// ── @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  // Check task exists
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check the task belongs to the logged-in user
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this task");
  }

  const { title, description, priority, status, dueDate } = req.body;

  task.title = title !== undefined ? title : task.title;
  task.description = description !== undefined ? description : task.description;
  task.priority = priority !== undefined ? priority : task.priority;
  task.status = status !== undefined ? status : task.status;
  task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

  const updatedTask = await task.save();

  res.status(200).json(updatedTask);
});

// ── @desc    Delete a task
// ── @route   DELETE /api/tasks/:id
// ── @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  // Check task exists
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  // Check the task belongs to the logged-in user
  if (task.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this task");
  }

  await task.deleteOne();

  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = { getTasks, createTask, updateTask, deleteTask };
