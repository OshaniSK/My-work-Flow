// backend/controllers/userController.js
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single user
// @route   GET /api/users/:id
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new user
// @route   POST /api/users
const createUser = async (req, res, next) => {
    try {
        const { name, email, age } = req.body;
        if (!name || !email || !age) {
            res.status(400);
            throw new Error('Please add all fields');
        }
        const user = await User.create({ name, email, age });
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 11000) {
            res.status(400);
            return next(new Error('Email already exists'));
        }
        next(error);
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        await user.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
