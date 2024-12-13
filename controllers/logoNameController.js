
const LogoName = require('../models/LogoName');

// Get About Page Content
const getLogoNameContent = async (req, res) => {
    try {
        const logoName  = await LogoName.findOne();
        res.status(200).json(logoName );
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create About Page Content
const createLogoNameContent = async (req, res) => {
    try {
        const newName = new LogoName(req.body);
        const savedName = await newName.save();
        res.status(201).json(savedName);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update About Page Content
const updateLogoNameContent = async (req, res) => {
    try {
        const updatedName = await LogoName.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedName);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete About Page Content
const deleteLogoNameContent = async (req, res) => {
    try {
        await LogoName.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Logo Name content deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getLogoNameContent,
    createLogoNameContent,
    updateLogoNameContent,
    deleteLogoNameContent,
};
