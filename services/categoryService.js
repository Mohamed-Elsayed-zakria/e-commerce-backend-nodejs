const CategoryModel = require("../models/categoryModel");
const asyncHandler = require('express-async-handler');
const ApiError = require("../utils/apiError");
const slugify = require("slugify");

// @desc get all categories
// @route GET /api/v1/categories/
// @access public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 20;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find().skip(skip).limit(limit);
  res.status(200).json({
    result: categories.length,
    pageNumber: page,
    data: categories,
  });
});

// @desc get one category
// @route GET /api/v1/categories/:id
// @access public
exports.getOneCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`category with id ${id} not found`, 404));
  }
  res.status(200).json(category);
});

// @desc create category
// @route POST /api/v1/categories/
// @access private
exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({
    message: "category created successfully",
    data: category,
  });
});

// @desc update category
// @route PUT /api/v1/categories/:id
// @access private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`category with id ${id} not found`, 404));
  }
  res.status(200).json({
    message: "category updated successfully",
    data: category,
  });
});

// @desc delete category
// @route DELETE /api/v1/categories/:id
// @access private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`category with id ${id} not found`, 404));
  }
  res.status(200).json({
    message: "category deleted successfully",
  });
});