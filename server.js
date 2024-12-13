const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const logoRoutes = require('./routes/logoRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const aboutImageRoutes=require('./routes/aboutImageRoutes');
const logoNameRoutes =require('./routes/logoNameRoutes');
const galleryRoutes =require('./routes/galleryRoutes');
const contactRoutes =require('./routes/contactsRoutes');
const testimonialRoutes=require('./routes/testimonialRoutes')
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); 
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// Routes
app.use('/api/logo', logoRoutes);
app.use('/api/slider', sliderRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/aboutImage', aboutImageRoutes);
app.use('/api/logoName', logoNameRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/testimonials", testimonialRoutes);



// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
