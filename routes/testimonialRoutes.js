const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");

// Create a new testimonial
router.post("/", testimonialController.createTestimonial);

// Get all testimonials
router.get("/", testimonialController.getAllTestimonials);

// Delete a testimonial by ID
router.delete("/:id", testimonialController.deleteTestimonial);

// Update a testimonial by ID
router.put("/:id", testimonialController.updateTestimonial);

module.exports = router;
