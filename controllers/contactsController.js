const Contact = require('../models/Contacts');

// Get Contact Details
exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findOne(); // Assuming one entry for simplicity
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contact details', error });
    }
};

// Update Contact Details
exports.updateContact = async (req, res) => {
    try {
        const { email, phone } = req.body;
        let contact = await Contact.findOne();

        if (contact) {
            // Update existing entry
            contact.email = email || contact.email;
            contact.phone = phone || contact.phone;
            contact = await contact.save();
        } else {
            // Create a new entry if none exists
            contact = new Contact({ email, phone });
            await contact.save();
        }

        res.status(200).json({ message: 'Contact details updated successfully', contact });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update contact details', error });
    }
};

// Add Contact (Explicit Create)
exports.addContact = async (req, res) => {
    try {
        const { email, phone } = req.body;
        const newContact = new Contact({ email, phone });
        await newContact.save();

        res.status(201).json({ message: 'Contact added successfully', contact: newContact });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add contact details', error });
    }
};

// Delete Contact Details
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params; // Assuming ID is passed as a parameter
        const contact = await Contact.findByIdAndDelete(id);

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete contact details', error });
    }
};
