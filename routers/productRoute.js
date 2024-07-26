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

const { protect } = require("../services/authService");

const upload = require("../middleware/upload_image");

const express = require("express");
const router = express.Router();

// routes
router.get("/", getAllProducts);
router.get("/:id", getOneProductValidator, getOneProduct);
router.post("/", protect, upload.single("imageCover"), createProductValidator, createProduct);
router.put("/:id", protect, updateProductValidator, updateProduct);
router.delete("/:id", protect, deleteProductValidator, deleteProduct);

module.exports = router;
