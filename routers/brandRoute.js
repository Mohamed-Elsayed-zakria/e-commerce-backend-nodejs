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

const express = require("express");
const router = express.Router();

// routes
router.get("/", getAllBrands);
router.get("/:id", getOneBrandValidator, getOneBrand);
router.post("/", createBrandValidator, createBrand);
router.put("/:id", updateBrandValidator, updateBrand);
router.delete("/:id", deleteBrandValidator, deleteBrand);

module.exports = router;
