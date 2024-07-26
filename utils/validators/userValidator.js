const validatorMiddleware = require('../../middleware/validatorMiddleware');
const User = require('../../models/userModel');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('user name is required')
        .isLength({ min: 3 })
        .withMessage('user name must be at least 3 characters')
        .isLength({ max: 32 })
        .withMessage('user name is too large'),
    check('email')
        .notEmpty()
        .withMessage('user email is required')
        .isEmail()
        .withMessage('Invalid email format')
        .custom((value) => {
            return User.findOne({ email: value }).then((user) => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            })
        }),
    check('password')
        .notEmpty()
        .withMessage('user password is required')
        .isLength({ min: 8 })
        .withMessage('user password must be at least 8 characters'),
    check('passwordConfirmation')
        .notEmpty()
        .withMessage('password confirmation is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('passwords do not match');
            }
            return true;
        }),
    check('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('user role must be user or admin'),
    check('phoneNumber')
        .optional()
        .isMobilePhone(['ar-EG', 'ar-SA'])
        .withMessage('Invalid phone number format'),
    validatorMiddleware,
]

exports.changeUserPasswordValidator = [
    check('id')
        .notEmpty()
        .withMessage('user id is required')
        .isMongoId()
        .withMessage('Invalid user id format'),
    check('currentPassword')
        .notEmpty()
        .withMessage('current password is required'),
    check('passwordConfirmation')
        .notEmpty()
        .withMessage('password confirmation is required'),
    check('password')
        .notEmpty()
        .withMessage('user password is required')
        .custom(async (value, { req }) => {
            // 1) verify current password
            const user = await User.findById(req.params.id);
            if (!user) {
                throw new Error('user not found');
            }
            const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
            if (!isMatch) {
                throw new Error('current password is incorrect');
            }

            // 2) verify confirmation password
            if (value !== req.body.passwordConfirmation) {
                throw new Error('passwords do not match');
            }
            return true;
        }),
    validatorMiddleware,
]

exports.getOneUserValidator = [
    check('id')
        .notEmpty()
        .withMessage('user id is required')
        .isMongoId()
        .withMessage('Invalid user id format'),
    validatorMiddleware,
]

exports.updateUserValidator = [
    check('id')
        .notEmpty()
        .withMessage('user id is required')
        .isMongoId()
        .withMessage('Invalid user id format'),
    check('name')
        .notEmpty()
        .withMessage('user name is required'),
    check('profilePic')
        .optional(),
    check('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('user role must be user or admin'),
    check('phoneNumber')
        .optional()
        .isMobilePhone(['ar-EG', 'ar-SA'])
        .withMessage('Invalid phone number format'),
    validatorMiddleware,
]

exports.deleteUserValidator = [
    check('id')
        .notEmpty()
        .withMessage('user id is required')
        .isMongoId()
        .withMessage('Invalid user id format'),
    validatorMiddleware,
]