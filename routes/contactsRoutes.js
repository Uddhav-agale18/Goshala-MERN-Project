// routes/contactRoutes.js
const express = require('express');
const {
    getContact,
    updateContact,
    addContact,
    deleteContact,
} = require('../controllers/contactsController');

const router = express.Router();

// GET: Fetch contact details
router.get('/', getContact);

// PUT: Update contact details
router.put('/', updateContact);

// POST: Add a new contact
router.post('/', addContact);

// DELETE: Delete a contact by ID
router.delete('/:id', deleteContact);

module.exports = router;
