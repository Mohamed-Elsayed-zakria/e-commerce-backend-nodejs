const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const express = require("express");
const router = express.Router();

router.get("/", getCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
