const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: [true, "category name must be unique"],
      minLength: [3, "category name must be at least 3 characters"],
      maxLength: [32, "category name is too large"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Category", categorySchema)