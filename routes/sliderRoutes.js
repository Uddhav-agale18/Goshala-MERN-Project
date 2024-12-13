const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { getSliderImages, addSliderImage, deleteSliderImage } = require('../controllers/sliderController');

router.get('/', getSliderImages);
router.post('/', upload.single('sliderImage'), addSliderImage);
router.delete('/:id', deleteSliderImage);

module.exports = router;
