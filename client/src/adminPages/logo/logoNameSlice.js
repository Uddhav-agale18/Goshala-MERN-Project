import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/logoName'; // Backend API endpoint

// Fetch logo name
export const fetchLogoName = createAsyncThunk('logoName/fetchLogoName', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Create logo name
export const createLogoName = createAsyncThunk('logoName/createLogoName', async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
});

// Update logo name
export const updateLogoName = createAsyncThunk('logoName/updateLogoName', async ({ id, name }) => {
    const response = await axios.put(`${API_URL}/${id}`, { name });
    return response.data;
});

// Delete logo name
export const deleteLogoName = createAsyncThunk('logoName/deleteLogoName', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

// Create slice
const logoNameSlice = createSlice({
    name: 'logoName',
    initialState: {
        logoName: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch logo name
            .addCase(fetchLogoName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLogoName.fulfilled, (state, action) => {
                state.loading = false;
                state.logoName = action.payload ? [action.payload] : [];
            })
            .addCase(fetchLogoName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Create logo name
            .addCase(createLogoName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLogoName.fulfilled, (state, action) => {
                state.loading = false;
                state.logoName.push(action.payload);
            })
            .addCase(createLogoName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Update logo name
            .addCase(updateLogoName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLogoName.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.logoName.findIndex((item) => item._id === action.payload._id);
                if (index >= 0) {
                    state.logoName[index] = action.payload;
                }
            })
            .addCase(updateLogoName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Delete logo name
            .addCase(deleteLogoName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLogoName.fulfilled, (state, action) => {
                state.loading = false;
                state.logoName = state.logoName.filter((item) => item._id !== action.payload);
            })
            .addCase(deleteLogoName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default logoNameSlice.reducer;
