const validatorMiddleware = require('../../middleware/validatorMiddleware');
const { check } = require('express-validator');

exports.getOneSubCategoryValidator = [
    check('id')
        .notEmpty()
        .withMessage('category id is required')
        .isMongoId()
        .withMessage('Invalid subCategory id format'),
    validatorMiddleware,
]

exports.createSubCategoryValidator = [
    check('name')
        .notEmpty()
        .withMessage('subCategory name is required')
        .isLength({ min: 2 })
        .withMessage('subCategory name must be at least 2 characters')
        .isLength({ max: 32 })
        .withMessage('subCategory name is too large'),
    check('category')
        .notEmpty()
        .withMessage('category is required')
        .isMongoId()
        .withMessage('Invalid category id format'),
    validatorMiddleware,
]

exports.updateSubCategoryValidator = [
    check('id')
        .notEmpty()
        .withMessage('category id is required')
        .isMongoId()
        .withMessage('Invalid subCategory id format'),
    validatorMiddleware,
]

exports.deleteSubCategoryValidator = [
    check('id')
        .notEmpty()
        .withMessage('category id is required')
        .isMongoId()
        .withMessage('Invalid subCategory id format'),
    validatorMiddleware,
]