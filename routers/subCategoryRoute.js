const {
    getSubCategories,
    getOneSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    setCategoryIdToBody,
    createFilterObject,
} = require("../services/subCategoryService");

const {
    getOneSubCategoryValidator,
    createSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const express = require("express");

// mergeParams : allow us to use access parameters on other routes
const router = express.Router({ mergeParams: true });

// routes
router.get("/", createFilterObject, getSubCategories);
router.post("/", setCategoryIdToBody, createSubCategoryValidator, createSubCategory);
router.get("/:id", getOneSubCategoryValidator, getOneSubCategory);
router.put("/:id", updateSubCategoryValidator, updateSubCategory);
router.delete("/:id", deleteSubCategoryValidator, deleteSubCategory);

module.exports = router