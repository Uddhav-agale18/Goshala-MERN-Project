import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/gallery';

// Fetch all gallery images
export const fetchGalleryImages = createAsyncThunk('gallery/fetchImages', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Add a new gallery image
export const addGalleryImage = createAsyncThunk('gallery/addImage', async (file) => {
    const formData = new FormData();
    formData.append('galleryImage', file);

    const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
});

// Delete a gallery image
export const deleteGalleryImage = createAsyncThunk('gallery/deleteImage', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: { images: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Gallery Images
            .addCase(fetchGalleryImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGalleryImages.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload;
            })
            .addCase(fetchGalleryImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Add Gallery Image
            .addCase(addGalleryImage.fulfilled, (state, action) => {
                state.images.push(action.payload);
            })
            // Delete Gallery Image
            .addCase(deleteGalleryImage.fulfilled, (state, action) => {
                state.images = state.images.filter((image) => image._id !== action.payload);
            });
    },
});

export default gallerySlice.reducer;
