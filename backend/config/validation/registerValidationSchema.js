const { body } = require('express-validator');

const registerValidationSchema = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be character')
    .isLength({ min: 6, max: 24 }).withMessage('Name must be 6–24 characters'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isString().isEmail().withMessage('Must be a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 12 }).withMessage('Password must be 6–12 characters')
    .matches(/[a-zA-Z]/).withMessage('Must contain letters')
    .matches(/\d/).withMessage('Must contain numbers')
    .matches(/[^a-zA-Z0-9]/).withMessage('Must contain special character'),

  body('confirm_password')
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords do not match');
      return true;
    })
];

module.exports = registerValidationSchema;