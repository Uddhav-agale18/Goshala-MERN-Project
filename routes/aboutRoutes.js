const express = require('express');
const router = express.Router();
const {
    getAboutContent,
    createAboutContent,
    updateAboutContent,
    deleteAboutContent,
} = require('../controllers/aboutController');

// Get About Page Content
router.get('/', getAboutContent);

// Create About Page Content
router.post('/', createAboutContent);

// Update About Page Content
router.put('/:id', updateAboutContent);

// Delete About Page Content
router.delete('/:id', deleteAboutContent);

module.exports = router;
