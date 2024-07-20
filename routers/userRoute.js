const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    changeUserPassword,
} = require("../services/userService");

const {
    getOneUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
} = require("../utils/validators/userValidator");

const express = require("express");
const router = express.Router();

// routes
router.get("/", getAllUsers);
router.get("/:id", getOneUserValidator, getOneUser);
router.post("/", createUserValidator, createUser);
router.put("/:id", updateUserValidator, updateUser);
router.put("/changePassword/:id",changeUserPasswordValidator, changeUserPassword);
router.delete("/:id", deleteUserValidator, deleteUser);

module.exports = router;