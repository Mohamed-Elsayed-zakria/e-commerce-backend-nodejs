const {
    signUp,
    login,
} = require("../services/authService");

const {
    signUpValidator,
    loginValidator,
} = require("../utils/validators/authValidator");

const express = require("express");
const router = express.Router();

// routes
router.post("/singup", signUpValidator, signUp);
router.post("/login", loginValidator, login);

module.exports = router;