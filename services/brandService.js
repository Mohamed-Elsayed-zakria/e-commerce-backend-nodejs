const BrandModel = require("../models/brandModel");
const asyncHandler = require('express-async-handler');
const ApiError = require("../utils/apiError");
const slugify = require("slugify");

// @desc get all brands
// @route GET /api/v1/brands/
// @access public
exports.getAllBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find().skip(skip).limit(limit);
  res.status(200).json({
    result: brands.length,
    pageNumber: page,
    data: brands,
  });
});

// @desc get one brand
// @route GET /api/v1/brands/:id
// @access public
exports.getOneBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`brand with id ${id} not found`, 404));
  }
  res.status(200).json(brand);
});

// @desc create brand
// @route POST /api/v1/brands/
// @access private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({
    message: "brand created successfully",
    data: brand,
  });
});

// @desc update brand
// @route PUT /api/v1/brands/:id
// @access private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`brand with id ${id} not found`, 404));
  }
  res.status(200).json({
    message: "brand updated successfully",
    data: brand,
  });
});

// @desc delete brand
// @route DELETE /api/v1/brands/:id
// @access private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`brand with id ${id} not found`, 404));
  }
  res.status(200).json({
    message: "brand deleted successfully",
  });
});