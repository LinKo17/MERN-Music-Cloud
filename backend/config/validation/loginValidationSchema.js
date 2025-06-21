const { body } = require('express-validator');

const loginValidationSchema = [
    body('email')
    .notEmpty().withMessage('Email is required')
    .isString().isEmail().withMessage('Must be a valid email'),

    body('password')
    .notEmpty().withMessage('Password is required')
]

module.exports = loginValidationSchema;