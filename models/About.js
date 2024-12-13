const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    mission: { type: String, required: true },
    vision: { type: String, required: true },
    image: { type: String,required: true },  // New field for storing image URL
}, { timestamps: true });

module.exports = mongoose.model('About', AboutSchema);
