const { body } = require('express-validator')

const addMusicValidationSchema = [
    body('playlistOption')
    .notEmpty().withMessage('playlist options required'),
    body('musicName')
    .notEmpty().withMessage('Music Name is required')
    .isString()
    .isLength({min:1,max:30}).withMessage('Music Name must be 1–30 characters')
]

module.exports = addMusicValidationSchema