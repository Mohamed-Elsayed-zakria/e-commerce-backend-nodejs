const validatorMiddleware = require('../../middleware/validatorMiddleware');
const User = require('../../models/userModel');
const { check } = require('express-validator');

exports.signUpValidator = [
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
    validatorMiddleware,
]

exports.loginValidator = [
    check('email')
        .notEmpty()
        .withMessage('user email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    check('password')
        .notEmpty()
        .withMessage('user password is required'),
    validatorMiddleware,
]