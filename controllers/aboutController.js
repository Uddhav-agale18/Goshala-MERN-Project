const About = require('../models/About');
const upload = require('../middlewares/upload'); // Import the upload middleware

// Get About Page Content
const getAboutContent = async (req, res) => {
    try {
        const about = await About.findOne();
        res.status(200).json(about);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create About Page Content
const createAboutContent = async (req, res) => {
    try {
        const { title, description, mission, vision } = req.body;
        let imageUrl = '';  // Default if no image is uploaded

        if (req.file) {
            imageUrl = req.file.path;  // Use the path of the uploaded image
        }

        const newAbout = new About({
            title,
            description,
            mission,
            vision,
            image: imageUrl
        });

        const savedAbout = await newAbout.save();
        res.status(201).json(savedAbout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update About Page Content
const updateAboutContent = async (req, res) => {
    try {
        const updatedData = { ...req.body };

        // If an image is uploaded, update the image field
        if (req.file) {
            updatedData.image = req.file.path;
        }

        const updatedAbout = await About.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json(updatedAbout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete About Page Content
const deleteAboutContent = async (req, res) => {
    try {
        await About.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'About content deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAboutContent,
    createAboutContent,
    updateAboutContent,
    deleteAboutContent,
    upload // Exporting the upload middleware for use in routes
};




// const About = require('../models/About');

// // Get About Page Content
// const getAboutContent = async (req, res) => {
//     try {
//         const about = await About.findOne();
//         res.status(200).json(about);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Create About Page Content
// const createAboutContent = async (req, res) => {
//     try {
//         const newAbout = new About(req.body);
//         const savedAbout = await newAbout.save();
//         res.status(201).json(savedAbout);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Update About Page Content
// const updateAboutContent = async (req, res) => {
//     try {
//         const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.status(200).json(updatedAbout);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // Delete About Page Content
// const deleteAboutContent = async (req, res) => {
//     try {
//         await About.findByIdAndDelete(req.params.id);
//         res.status(200).json({ message: 'About content deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = {
//     getAboutContent,
//     createAboutContent,
//     updateAboutContent,
//     deleteAboutContent,
// };
