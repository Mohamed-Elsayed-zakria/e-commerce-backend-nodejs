const validatorMiddleware = require('../../middleware/validatorMiddleware');
const { check } = require('express-validator');

exports.createProductValidator = [
    check('title')
        .notEmpty()
        .withMessage('product name is required')
        .isLength({ min: 3 })
        .withMessage('product name must be at least 3 characters')
        .isLength({ max: 100 })
        .withMessage('product name is too large'),
    check('description')
        .notEmpty()
        .withMessage('product description is required')
        .isLength({ min: 3 })
        .withMessage('product description must be at least 3 characters')
        .isLength({ max: 2000 })
        .withMessage('product description is too large'),
    check('quantity')
        .notEmpty()
        .withMessage('product quantity is required')
        .isNumeric()
        .withMessage('product quantity must be numeric'),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage('product sold must be numeric'),
    check('price')
        .notEmpty()
        .withMessage('product price is required')
        .isNumeric()
        .withMessage('product price must be numeric'),
    check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .withMessage('product priceAfterDiscount must be numeric')
        .toFloat()
        .custom((value, { req }) => {
            if (value < req.body.price) {
                throw new Error('product priceAfterDiscount must be greater than product price')
            }
            return true;
        }),
    check('colors')
        .optional()
        .isArray()
        .withMessage('product colors must be an array'),
    check('imageCover')
        .notEmpty()
        .withMessage('product imageCover is required'),
    check('images')
        .optional()
        .isArray()
        .withMessage('product images must be an array'),
    check('category')
        .notEmpty()
        .withMessage('product category is required')
        .isMongoId()
        .withMessage('Invalid category id format'),
    validatorMiddleware,
]

exports.getOneProductValidator = [
    check('id')
        .notEmpty()
        .withMessage('product id is required')
        .isMongoId()
        .withMessage('Invalid product id format'),
    validatorMiddleware,
]

exports.updateProductValidator = [
    check('id')
        .notEmpty()
        .withMessage('product id is required')
        .isMongoId()
        .withMessage('Invalid product id format'),
    validatorMiddleware,
]

exports.deleteProductValidator = [
    check('id')
        .notEmpty()
        .withMessage('product id is required')
        .isMongoId()
        .withMessage('Invalid product id format'),
    validatorMiddleware,
]