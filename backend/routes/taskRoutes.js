// File: backend/routes/taskRoutes.js
// Full implementation coming in the Tasks step

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Task routes working" });
});

module.exports = router;
