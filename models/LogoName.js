const mongoose = require('mongoose');

const LogonameSchema = new mongoose.Schema({
    name: { type: String, required: true },
    
}, { timestamps: true });

module.exports = mongoose.model('LogoName', LogonameSchema);
