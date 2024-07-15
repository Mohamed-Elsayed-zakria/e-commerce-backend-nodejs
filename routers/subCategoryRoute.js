const {
    getSubCategories,
    getOneSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
} = require("../services/subCategoryService");

const {
    getOneSubCategoryValidator,
    createSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const express = require("express");
const router = express.Router();

// routes
router.get("/", getSubCategories);
router.post("/",createSubCategoryValidator, createSubCategory);
router.get("/:id",getOneSubCategoryValidator, getOneSubCategory);
router.put("/:id",updateSubCategoryValidator, updateSubCategory);
router.delete("/:id",deleteSubCategoryValidator, deleteSubCategory);

module.exports = router