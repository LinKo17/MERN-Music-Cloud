const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const verifyToken = require('../../middleware/verifyToken');

// validation 
const addMusicSchema = require('../../config/validation/addMusicValidationSchema')

// file middleware & validation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..','..','uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const fileFilter  = (req,file,cb) => {
    const allowedType = ['audio/mpeg'];
    if(allowedType.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Does not match the file type'),false);
    }
}
const upload = multer({ 
    storage: storage,
    fileFilter,
    limits : 3 * 1024 * 1024
})
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({'message': [
      {type: "field", msg: `${err.message}`, path: "musicFile"}
    ]}); // check file size
  } else if (err) {
    return res.status(400).json({'message': [
      {type: "field", msg: `${err.message}`, path: "musicFile"}
    ]});  // check file type
  }
  next();  
};

const {
    create,
    show,
    playlist,
    playlistDel,
    musicDel
} = require('../../controllers/playlistController');

// create playlist
router.post('/create', 
  verifyToken,
  upload.single('musicFile'), 
  multerErrorHandler, 
  addMusicSchema, 
  create );


// show playlist
router.post('/show',verifyToken,show);

// single playlist
router.post('/playlist', verifyToken,playlist);

// delete playlist
router.post('/delete', verifyToken, playlistDel);

// delete music
router.post('/music', verifyToken, musicDel)

module.exports = router