const asyncHandler = require('express-async-handler');
const UserModel = require("../models/userModel");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc signUp
// @route POST /api/v1/auth/signup
// @access public
exports.signUp = asyncHandler(async (req, res, next) => {
    // create user
    const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
        status: "success",
        data: user,
        token,
    });

})

// @desc login
// @route POST /api/v1/auth/login
// @access public
exports.login = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return next(new ApiError("Invalid email or password", 401));
    }
    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.status(200).json({
        status: "success",
        data: user,
        token,
    });
})

exports.protect = asyncHandler(async (req, res, next) => {
    // 1 check if token exist
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new ApiError("You are not logged in", 401));
    }
    // 2 verify token (no change happens , expired token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3 check if user exist
    const user = await UserModel.findById(decoded.id);
    if (!user) {
        return next(new ApiError("User not found", 401));
    }
    // 4 check if user changed password after the token created
    if (user.passwordChangedAt) {
        const changedTimestamp = parseInt(user.passwordChangedAt.getTime() / 1000, 10);
        if (changedTimestamp > decoded.iat) {
            return next(new ApiError("User recently changed password, please login again", 401));
        }
    }
    req.user = user;
    next();
})