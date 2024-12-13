import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/slider';

export const fetchSliderImages = createAsyncThunk('slider/fetchImages', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

export const addSliderImage = createAsyncThunk('slider/addImage', async (file) => {
    const formData = new FormData();
    formData.append('sliderImage', file);

    const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
});

export const deleteSliderImage = createAsyncThunk('slider/deleteImage', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const sliderSlice = createSlice({
    name: 'slider',
    initialState: { images: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSliderImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSliderImages.fulfilled, (state, action) => {
                state.loading = false;
                state.images = action.payload;
            })
            .addCase(fetchSliderImages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addSliderImage.fulfilled, (state, action) => {
                state.images.push(action.payload);
            })
            .addCase(deleteSliderImage.fulfilled, (state, action) => {
                state.images = state.images.filter((image) => image._id !== action.payload);
            });
    },
});

export default sliderSlice.reducer;
