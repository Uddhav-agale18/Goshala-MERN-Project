const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  galleryImage: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('gallery', gallerySchema);
