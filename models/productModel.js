const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "product name is required"],
            minLength: [3, "product name must be at least 3 characters"],
            maxLength: [100, "product name is too large"],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, "product description is required"],
            minLength: [3, "product description must be at least 3 characters"],
            maxLength: [2000, "product description is too large"],
        },
        quantity: {
            type: Number,
            required: [true, "product quantity is required"],
        },
        sold: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
            required: [true, "product price is required"],
            min: [0, "product price can't be negative"],
        },
        priceAfterDiscount: {
            type: Number,
        },
        colors: [String],
        imageCover: {
            type: String,
            required: [true, "product imageCover is required"],
        },
        images: [String],
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            required: [true, "product must belong to a category"],
        },
        subCategories: {
            type: [mongoose.Schema.ObjectId],
            ref: "SubCategory",
        },
        brand: {
            type: mongoose.Schema.ObjectId,
            ref: "Brand",
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, "rating must be above 1.0"],
            max: [5, "rating must be below 5.0"],
        },
        ratingsQuantity: {
            type: Number,
            default: 0,
        },

    },
    { timestamps: true }
);


module.exports = mongoose.model("Product", productSchema)