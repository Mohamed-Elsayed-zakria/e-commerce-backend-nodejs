const {
  getAllBrands,
  getOneBrand,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");

const {
  getOneBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utils/validators/BrandValidator");

const { protect } = require("../services/authService");

const express = require("express");
const router = express.Router();

// routes
router.get("/", getAllBrands);
router.get("/:id", getOneBrandValidator, getOneBrand);
router.post("/", protect, createBrandValidator, createBrand);
router.put("/:id", protect, updateBrandValidator, updateBrand);
router.delete("/:id", protect, deleteBrandValidator, deleteBrand);

module.exports = router;
