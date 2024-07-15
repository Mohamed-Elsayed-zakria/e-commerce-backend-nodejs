const {
  getCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const {
  getOneCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const express = require("express");
const router = express.Router();

// routes
router.get("/", getCategories);
router.get("/:id", getOneCategoryValidator, getOneCategory);
router.post("/", createCategoryValidator, createCategory);
router.put("/:id", updateCategoryValidator, updateCategory);
router.delete("/:id",deleteCategoryValidator, deleteCategory);

module.exports = router;
