const productModel = require("../models/productModel");
const asyncHandler = require('express-async-handler');
const ApiError = require("../utils/apiError");
const slugify = require("slugify");

// @desc get all products
// @route GET /api/v1/products/
// @access public
exports.getAllProducts = asyncHandler(async (req, res) => {
    // filter
    const filterObj = { ...req.query };
    const excludeFields = ["sort", "page", "limit", "fields", "keyword"];
    excludeFields.forEach((el) => delete filterObj[el]);

    let filterString = JSON.stringify(filterObj);
    filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    let queryStr = JSON.parse(filterString);

    // search
    if (req.query.keyword) {
        queryStr.$or = [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } }
        ];
    }

    // sorting
    let querySortStr = "-createdAt";
    if (req.query.sort) {
        querySortStr = req.query.sort.split(",").join(" ");
    }

    // fields
    let queryFields = "-__v";
    if (req.query.fields) {
        queryFields = req.query.fields.split(",").join(" ");
    }

    // pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;

    const products = await productModel.find(queryStr)
        .skip(skip).limit(limit)
        .populate({ path: "category", select: "-__v" })
        .sort(querySortStr)
        .select(queryFields);

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
    req.body.imageCover = req.file.filename;
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