const validatorMiddleware = require('../../middleware/validatorMiddleware');
const { check } = require('express-validator');

exports.getOneBrandValidator = [
    check('id')
        .notEmpty()
        .withMessage('brand id is required')
        .isMongoId()
        .withMessage('Invalid brand id format'),
    validatorMiddleware,
]

exports.createBrandValidator = [
    check('name')
        .notEmpty()
        .withMessage('brand name is required')
        .isLength({ min: 3 })
        .withMessage('brand name must be at least 3 characters')
        .isLength({ max: 32 })
        .withMessage('brand name is too large'),
    validatorMiddleware,
]

exports.updateBrandValidator = [
    check('id')
        .notEmpty()
        .withMessage('brand id is required')
        .isMongoId()
        .withMessage('Invalid brand id format'),
    check('name')
        .notEmpty()
        .withMessage('brand name is required'),
    validatorMiddleware,
]

exports.deleteBrandValidator = [
    check('id')
        .notEmpty()
        .withMessage('brand id is required')
        .isMongoId()
        .withMessage('Invalid brand id format'),
    validatorMiddleware,
]