const UserModel = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");

// @desc create user
// @route POST /api/v1/users/
// @access private
exports.createUser = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const user = await UserModel.create({
        slug: slugify(name),
        ...req.body,
    });
    res.status(201).json({
        message: "user created successfully",
        data: user,
    });
})

// @desc get all users
// @route GET /api/v1/users/
// @access private
exports.getAllUsers = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;
    const users = await UserModel.find().skip(skip).limit(limit);
    res.status(200).json({
        result: users.length,
        pageNumber: page,
        data: users,
    });
});

// @desc get one user
// @route GET /api/v1/users/:id
// @access private
exports.getOneUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
        return next(new ApiError(`user with id ${id} not found`, 404));
    }
    res.status(200).json(user);
});

// @desc update user
// @route PUT /api/v1/users/:id
// @access private
exports.updateUser = asyncHandler(async (req, res, next) => {
    const { name, phoneNumber, role } = req.body;
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(
        { _id: id },
        {
            name,
            slug: slugify(name),
            phoneNumber,
            role,
        },
        { new: true }
    );
    if (!user) {
        return next(new ApiError(`user with id ${id} not found`, 404));
    }
    res.status(200).json({
        message: "user updated successfully",
        data: user,
    });
});

// @desc update userPassword
// @route PUT /api/v1/users/:id
// @access private
exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const { password } = req.body;
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(
        { _id: id },
        {
            password: await bcrypt.hashSync(password, 12),
        },
        { new: true }
    );
    if (!user) {
        return next(new ApiError(`user with id ${id} not found`, 404));
    }
    res.status(200).json({
        message: "user updated successfully",
        data: user,
    });
});

// @desc delete user
// @route DELETE /api/v1/users/:id
// @access private
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
        return next(new ApiError(`user with id ${id} not found`, 404));
    }
    res.status(200).json({
        message: "user deleted successfully",
    });
});