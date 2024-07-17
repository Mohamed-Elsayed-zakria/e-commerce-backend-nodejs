const SubCategoryModel = require("../models/subCategoryModel");
const asyncHandler = require('express-async-handler');
const ApiError = require("../utils/apiError");
const slugify = require("slugify");

// @desc create subCategory
// @route POST /api/v1/subCategories/
// @access private
exports.setCategoryIdToBody = (req, res, next) => {
    if (!req.body.category) {
        req.body.category = req.params.categoryId;
    }
    next();
}

exports.createSubCategory = asyncHandler(async (req, res) => {
    const { name, category } = req.body;
    const subCategory = await SubCategoryModel.create({
        name,
        slug: slugify(name),
        category
    });
    res.status(201).json({
        message: "subCategory created successfully",
        data: subCategory,
    });
})


// @desc get all subCategories
// @route GET /api/v1/subCategories/
// @access public
exports.createFilterObject = (req,res,next) => {
    let filterObject = {};
    if (req.params.categoryId) {
        filterObject = { category: req.params.categoryId };
    }
    req.filterObj = filterObject;
    next();
}

exports.getSubCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;
    const subCategories = await SubCategoryModel.find(req.filterObj).skip(skip).limit(limit);
    // .populate({path: "category",select: "-__v"});
    res.status(200).json({
        result: subCategories.length,
        pageNumber: page,
        data: subCategories,
    });
});


// @desc get one subCategory
// @route GET /api/v1/subCategories/:id
// @access public
exports.getOneSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategoryModel.findById(id);
    // .populate({path: "category",select: "-__v",});
    if (!subCategory) {
        return next(new ApiError(`subCategory with id ${id} not found`, 404));
    }
    res.status(200).json(subCategory);
});


// @desc update subCategory
// @route PUT /api/v1/subCategories/:id
// @access private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    const subCategory = await SubCategoryModel.findByIdAndUpdate(
        { _id: id },
        { name, slug: slugify(name), category },
        { new: true }
    );
    if (!subCategory) {
        return next(new ApiError(`subCategory with id ${id} not found`, 404));
    }
    res.status(200).json({
        message: "subCategory updated successfully",
        data: subCategory,
    });
})


// @desc delete subCategory
// @route DELETE /api/v1/subCategories/:id
// @access private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await SubCategoryModel.findByIdAndDelete({ _id: id });
    if (!subCategory) {
        return next(new ApiError(`subCategory with id ${id} not found`, 404));
    }
    res.status(200).json({
        message: "subCategory deleted successfully",
    });
})

