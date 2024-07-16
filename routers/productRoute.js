const {
    getAllProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../services/productService");

const {
    getOneProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator,
} = require("../utils/validators/productValidator");

const express = require("express");
const router = express.Router();

// routes
router.get("/", getAllProducts);
router.get("/:id", getOneProductValidator, getOneProduct);
router.post("/", createProductValidator, createProduct);
router.put("/:id", updateProductValidator, updateProduct);
router.delete("/:id", deleteProductValidator, deleteProduct);

module.exports = router;
