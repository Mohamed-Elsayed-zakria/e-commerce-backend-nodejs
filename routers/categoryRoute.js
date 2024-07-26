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

const { protect } = require("../services/authService");

const subCategoryRoute = require("./subCategoryRoute");

const express = require("express");
const router = express.Router();

router.use("/:categoryId/subCategories", subCategoryRoute);

// routes
router.get("/", getCategories);
router.get("/:id", getOneCategoryValidator, getOneCategory);
router.post("/", protect, createCategoryValidator, createCategory);
router.put("/:id",protect, updateCategoryValidator, updateCategory);
router.delete("/:id",protect, deleteCategoryValidator, deleteCategory);

module.exports = router;
