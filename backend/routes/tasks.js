// File: backend/routes/tasks.js

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// All routes below this line are protected by the JWT middleware
router.use(protect);

// GET  /api/tasks      → get all tasks for logged-in user
// POST /api/tasks      → create a new task
router.route("/").get(getTasks).post(createTask);

// PUT    /api/tasks/:id → update a task
// DELETE /api/tasks/:id → delete a task
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
