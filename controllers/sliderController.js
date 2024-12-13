const Slider = require('../models/Slider');
const fs = require('fs');

// Get all slider images
exports.getSliderImages = async (req, res) => {
    try {
        const sliders = await Slider.find();
        res.status(200).json(sliders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a new slider image
exports.addSliderImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const newSlider = new Slider({
        sliderImage: req.file.filename,
    });

    try {
        await newSlider.save();
        res.status(201).json(newSlider);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a slider image
exports.deleteSliderImage = async (req, res) => {
    const { id } = req.params;

    try {
        const slider = await Slider.findById(id);
        if (slider) {
            // Delete file from server
            fs.unlinkSync(`./uploads/${slider.sliderImage}`);
            await Slider.findByIdAndDelete(id);
            res.status(200).json({ message: 'Slider image deleted successfully' });
        } else {
            res.status(404).json({ message: 'Slider image not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
