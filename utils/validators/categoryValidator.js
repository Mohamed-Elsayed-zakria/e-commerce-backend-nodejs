const validatorMiddleware = require('../../middleware/validatorMiddleware');
const { check } = require('express-validator');

exports.getOneCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
]

exports.createCategoryValidator = [
    check('name').notEmpty().withMessage('Category name is required')
        .isLength({ min: 3 })
        .withMessage('Category name must be at least 3 characters')
        .isLength({ max: 32 })
        .withMessage('Category name is too large'),
    validatorMiddleware,
]

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
]

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
]