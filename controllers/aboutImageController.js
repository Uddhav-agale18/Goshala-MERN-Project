const AboutImage = require('../models/AboutImage');
const fs = require('fs');

// Get all logo images
exports.getAboutImages = async (req, res) => {
    try {
        const aboutImages = await AboutImage.find();
        res.status(200).json(aboutImages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new logo image
exports.addAboutImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const newAboutImage = new AboutImage({
        aboutImage: req.file.filename,  
    });

    try {
        await newAboutImage.save();
        res.status(201).json(newAboutImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a logo image
exports.deleteAboutImage = async (req, res) => {
    const { id } = req.params;

    try {
        const aboutImage = await AboutImage.findById(id);
        if (aboutImage) {
            fs.unlinkSync(`./uploads/${aboutImage.aboutImage}`);
            await AboutImage.findByIdAndDelete(id);
            res.status(200).json({ message: 'Logo image deleted successfully' });
        } else {
            res.status(404).json({ message: 'Logo image not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
