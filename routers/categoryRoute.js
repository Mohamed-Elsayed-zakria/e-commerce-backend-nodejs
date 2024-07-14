const {
  getCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const express = require("express");
const router = express.Router();

// routes
router.get("/", getCategories);
router.get("/:id", getOneCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
