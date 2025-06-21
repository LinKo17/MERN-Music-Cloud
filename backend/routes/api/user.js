const express = require('express');
const router = express.Router();

const registerValidationSchema = require('../../config/validation/registerValidationSchema')
const loginValidationSchema = require('../../config/validation/loginValidationSchema')

const verfiyToken = require('../../middleware/verfiyToken');

const {
    login,
    register,
    logout,
    refreshToken
} = require('../../controllers/userController');

router.post('/login',loginValidationSchema,login);
router.post('/register',registerValidationSchema,register);

router.post('/logout', verfiyToken, logout);
router.post('/refreshToken', verfiyToken, refreshToken);

module.exports = router