import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/aboutImage';

// Async thunk for fetching about images
export const fetchAboutImages = createAsyncThunk('aboutImage/fetchAboutImages', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Async thunk for adding a new about image
export const addAboutImage = createAsyncThunk('aboutImage/addAboutImage', async (file) => {
    const formData = new FormData();
    formData.append('aboutImage', file);
    try {
        const response = await axios.post(API_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log("Added about image:", response.data); // Debug log
        return response.data;
    } catch (error) {
        console.error("Error adding about image:", error.message); // Debug log
        throw error;
    }
});

// Async thunk for deleting an about image
export const deleteAboutImage = createAsyncThunk('aboutImage/deleteAboutImage', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const aboutImageSlice = createSlice({
    name: 'aboutImage',
    initialState: {
        aboutImages: [], // Array of about images
        loading: false, // Loading state for API requests
        error: null, // Error state for failed API requests
    },
    reducers: {}, // No custom reducers needed for now
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutImages.pending, (state) => {
                state.loading = true; // Set loading to true when fetching starts
            })
            .addCase(fetchAboutImages.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when data is fetched
                state.aboutImages = action.payload; // Store fetched images in state
            })
            .addCase(fetchAboutImages.rejected, (state, action) => {
                state.loading = false; // Set loading to false if fetch fails
                state.error = action.error.message; // Store error message in state
            })
            .addCase(addAboutImage.pending, (state) => {
                state.loading = true; // Set loading to true when adding an image
            })
            .addCase(addAboutImage.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when image is added
                state.aboutImages.push(action.payload); // Add new image to state
            })
            .addCase(addAboutImage.rejected, (state, action) => {
                state.loading = false; // Set loading to false if add fails
                state.error = action.error.message; // Store error message in state
            })
            .addCase(deleteAboutImage.pending, (state) => {
                state.loading = true; // Set loading to true when deleting an image
            })
            .addCase(deleteAboutImage.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false when image is deleted
                state.aboutImages = state.aboutImages.filter(
                    (aboutImage) => aboutImage._id !== action.payload // Remove deleted image from state
                );
            })
            .addCase(deleteAboutImage.rejected, (state, action) => {
                state.loading = false; // Set loading to false if delete fails
                state.error = action.error.message; // Store error message in state
            });
    },
});

export default aboutImageSlice.reducer;
