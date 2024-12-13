const Testimonial = require("../models/Testimonial");

// Create a new testimonial
exports.createTestimonial = async (req, res) => {
  try {
    const { name, feedback } = req.body;

    if (!name || !feedback) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTestimonial = new Testimonial({ name, feedback });
    await newTestimonial.save();

    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a testimonial by ID
exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.findByIdAndDelete(id);
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a testimonial by ID
exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, feedback } = req.body;

    if (!name || !feedback) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, feedback },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    res.json(updatedTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
