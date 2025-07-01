const express = require('express');
const router = express.Router();

const registerValidationSchema = require('../../config/validation/registerValidationSchema')
const loginValidationSchema = require('../../config/validation/loginValidationSchema')

const verifyToken = require('../../middleware/verifyToken');

const {
    login,
    register,
    logout,
    refreshToken
} = require('../../controllers/userController');

router.post('/login',loginValidationSchema,login);
router.post('/register',registerValidationSchema,register);

router.post('/logout', verifyToken, logout);
router.post('/refreshToken', refreshToken);

module.exports = router