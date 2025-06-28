const { body } = require('express-validator')

const addMusicValidationSchema = [
    body('playlistOption')
    .notEmpty().withMessage('playlist options required'),
    body('musicName')
    .notEmpty().withMessage('music Name is required')
    .isString()
    .isLength({min:1,max:30}).withMessage('music name must be 1–30 characters'),
    body('musicFile').custom((value, { req }) => {
    if (!req.file) {
        throw new Error('No file uploaded');
    }
    return true;
    })
]

module.exports = addMusicValidationSchema