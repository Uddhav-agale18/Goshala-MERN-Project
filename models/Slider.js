const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  sliderImage: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Slider', sliderSchema);
