const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { getGalleryImages , addGalleryImage , deleteGalleryImage  } = require('../controllers/galleryController');

router.get('/', getGalleryImages);
router.post('/', upload.single('galleryImage'), addGalleryImage );
router.delete('/:id', deleteGalleryImage );

module.exports = router;
