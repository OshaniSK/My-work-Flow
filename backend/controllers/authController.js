// File: backend/controllers/authController.js

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ── Helper: Generate a signed JWT ────────────────────────────────────────────
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// ── @desc    Register a new user
// ── @route   POST /api/auth/register
// ── @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email, and password");
  }

  // Check if a user with this email already exists
  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (userExists) {
    res.status(409);
    throw new Error("An account with that email already exists");
  }

  // Create the new user (password is hashed via pre-save hook in User model)
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// ── @desc    Authenticate user and return token
// ── @route   POST /api/auth/login
// ── @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  // Find user by email (case-insensitive via lowercase in schema)
  const user = await User.findOne({ email: email.toLowerCase() });

  // Check user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = { registerUser, loginUser };
