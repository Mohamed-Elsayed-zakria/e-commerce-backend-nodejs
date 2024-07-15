const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand name is required"],
      unique: [true, "brand name must be unique"],
      minLength: [3, "brand name must be at least 3 characters"],
      maxLength: [32, "brand name is too large"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Brand", brandSchema)