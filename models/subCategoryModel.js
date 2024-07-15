const mongoose = require("mongoose");


const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "subCategory name is required"],
            unique: [true, "subCategory name must be unique"],
            minLength: [2, "subCategory name must be at least 2 characters"],
            maxLength: [32, "subCategory name is too large"],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            required: [true, "subCategory must belong to a category"],
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("SubCategory", subCategorySchema)
