const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');  // Assuming you're using the same middleware for file uploads
const { getAboutImages, addAboutImage, deleteAboutImage } = require('../controllers/aboutImageController');

router.get('/', getAboutImages);

router.post('/', upload.single('aboutImage'), addAboutImage);


router.delete('/:id', deleteAboutImage);

module.exports = router;
