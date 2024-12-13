import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/testimonials"; // Replace with your backend URL

// Async Thunks
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const addTestimonial = createAsyncThunk(
  "testimonials/addTestimonial",
  async (testimonial) => {
    const response = await axios.post(API_URL, testimonial);
    return response.data;
  }
);

export const deleteTestimonial = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const updateTestimonial = createAsyncThunk(
  "testimonials/updateTestimonial",
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  }
);

// Slice
const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonials: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add Testimonial
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.testimonials.push(action.payload);
      })
      // Delete Testimonial
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(
          (testimonial) => testimonial._id !== action.payload
        );
      })
      // Update Testimonial
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(
          (testimonial) => testimonial._id === action.payload._id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload;
        }
      });
  },
});

export default testimonialSlice.reducer;
