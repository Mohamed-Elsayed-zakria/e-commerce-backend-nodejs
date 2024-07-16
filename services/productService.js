const productModel = require("../models/productModel");
const asyncHandler = require('express-async-handler');
const ApiError = require("../utils/apiError");
const slugify = require("slugify");

// @desc get all products
// @route GET /api/v1/products/
// @access public
exports.getAllProducts = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const products = await productModel.find().skip(skip).limit(limit).populate("category");
    res.status(200).json({
        result: products.length,
        pageNumber: page,
        data: products,
    });
});

// @desc get one product
// @route GET /api/v1/products/:id
// @access public
exports.getOneProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findById(id).populate("category");
    if (!product) {
        return next(new ApiError(`product with id ${id} not found`, 404));
    }
    res.status(200).json(product);
});

// @desc create product
// @route POST /api/v1/products/
// @access private
exports.createProduct = asyncHandler(async (req, res) => {
    const { title } = req.body;
    req.body.slug = slugify(title);
    const product = await productModel.create(req.body);
    res.status(201).json({
        message: "product created successfully",
        data: product,
    });
});

// @desc update product
// @route PUT /api/v1/products/:id
// @access private
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const { title } = req.body;
    const { id } = req.params;
    if (title) {
        req.body.slug = slugify(title);
    }
    const product = await productModel.findByIdAndUpdate(
        { _id: id },
        req.body,
        { new: true }
    );
    if (!product) {
        return next(new ApiError(`product with id ${id} not found`, 404));
    }
    res.status(200).json({
        message: "product updated successfully",
        data: product,
    });
});

// @desc delete product
// @route DELETE /api/v1/products/:id
// @access private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
        return next(new ApiError(`product with id ${id} not found`, 404));
    }
    res.status(200).json({
        message: "product deleted successfully",
    });
});