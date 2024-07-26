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

const { protect } = require("../services/authService");

const upload = require("../middleware/upload_image");

const express = require("express");
const router = express.Router();

// routes
router.get("/", protect, getAllUsers);
router.get("/:id", protect, getOneUserValidator, getOneUser);
router.post("/", protect, upload.single('profilePic'), createUserValidator, createUser);
router.put("/:id", protect, updateUserValidator, updateUser);
router.put("/changePassword/:id", protect, changeUserPasswordValidator, changeUserPassword);
router.delete("/:id", protect, deleteUserValidator, deleteUser);

module.exports = router;