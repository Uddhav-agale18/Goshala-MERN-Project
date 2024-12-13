import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/logo';

// Async thunk for fetching logos
export const fetchLogos = createAsyncThunk('logo/fetchLogos', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Async thunk for adding a logo
export const addLogo = createAsyncThunk('logo/addLogo', async (file) => {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
});

// Async thunk for deleting a logo
export const deleteLogo = createAsyncThunk('logo/deleteLogo', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const logoSlice = createSlice({
    name: 'logo',
    initialState: {
        logos: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLogos.fulfilled, (state, action) => {
                state.loading = false;
                state.logos = action.payload;
            })
            .addCase(fetchLogos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addLogo.pending, (state) => {
                state.loading = true;
            })
            .addCase(addLogo.fulfilled, (state, action) => {
                state.loading = false;
                state.logos.push(action.payload);
            })
            .addCase(addLogo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteLogo.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteLogo.fulfilled, (state, action) => {
                state.loading = false;
                state.logos = state.logos.filter((logo) => logo._id !== action.payload);
            })
            .addCase(deleteLogo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default logoSlice.reducer;
