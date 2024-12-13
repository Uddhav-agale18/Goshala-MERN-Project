const Gallery = require('../models/Gallery'); // Assuming your Gallery model is named 'gallery.js'
const fs = require('fs');

// Get all gallery images
exports.getGalleryImages = async (req, res) => {
    try {
        const galleries = await Gallery.find(); // Retrieve all gallery images
        res.status(200).json(galleries); // Return the gallery images as a JSON response
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors
    }
};

// Add a new gallery image
exports.addGalleryImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' }); // Check if a file is uploaded
    }

    // Create a new gallery image document
    const newGallery = new Gallery({
        galleryImage: req.file.filename, // Store the file name (or path) in the database
    });

    try {
        await newGallery.save(); // Save the new gallery image to the database
        res.status(201).json(newGallery); // Return the saved gallery image as a response
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors
    }
};

// Delete a gallery image
exports.deleteGalleryImage = async (req, res) => {
    const { id } = req.params; // Extract the gallery image ID from the request parameters

    try {
        const gallery = await Gallery.findById(id); // Find the gallery image by its ID
        if (gallery) {
            // If the gallery image exists, delete the file from the server
            fs.unlinkSync(`./uploads/${gallery.galleryImage}`); // Delete the image file from the uploads folder
            await Gallery.findByIdAndDelete(id); // Delete the gallery image record from the database
            res.status(200).json({ message: 'Gallery image deleted successfully' }); // Send success response
        } else {
            res.status(404).json({ message: 'Gallery image not found' }); // Handle case where the image doesn't exist
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle any errors
    }
};
