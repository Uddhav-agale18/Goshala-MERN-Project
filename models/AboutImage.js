const mongoose = require('mongoose');

const aboutImageSchema = new mongoose.Schema({
    aboutImage: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('AboutImage', aboutImageSchema);
