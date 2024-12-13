const express = require('express');
const router = express.Router();
const {
    getLogoNameContent,
    createLogoNameContent,
    updateLogoNameContent,
    deleteLogoNameContent,
} = require('../controllers/logoNameController');

router.get('/', getLogoNameContent);

router.post('/', createLogoNameContent);

router.put('/:id', updateLogoNameContent);

router.delete('/:id', deleteLogoNameContent);

module.exports = router;
