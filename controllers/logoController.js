const Logo = require('../models/Logo');
const fs = require('fs');

// Get all logo images
exports.getLogoImages = async (req, res) => {
    try {
        const logos = await Logo.find();
        res.status(200).json(logos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new logo image
exports.addLogoImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const newLogo = new Logo({
        logo: req.file.filename,  // Store the filename of the uploaded logo
    });

    try {
        await newLogo.save();
        res.status(201).json(newLogo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a logo image
exports.deleteLogoImage = async (req, res) => {
    const { id } = req.params;

    try {
        const logo = await Logo.findById(id);
        if (logo) {
            // Delete the logo file from the server
            fs.unlinkSync(`./uploads/${logo.logo}`);
            await Logo.findByIdAndDelete(id);
            res.status(200).json({ message: 'Logo image deleted successfully' });
        } else {
            res.status(404).json({ message: 'Logo image not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
