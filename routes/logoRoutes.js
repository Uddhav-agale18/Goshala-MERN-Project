const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { getLogoImages, addLogoImage, deleteLogoImage } = require('../controllers/logoController');

// Route to get all logos
router.get('/', getLogoImages);

// Route to add a new logo image
router.post('/', upload.single('logo'), addLogoImage);

// Route to delete a logo by its ID
router.delete('/:id', deleteLogoImage);

module.exports = router;
