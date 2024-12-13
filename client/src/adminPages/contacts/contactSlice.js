import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL
const API_URL = 'http://localhost:5000/api/contact';

// Fetch contact details
export const fetchContact = createAsyncThunk('contact/fetchContact', async () => {
    const response = await axios.get(API_URL);
    return response.data;
});

// Update contact details
export const updateContact = createAsyncThunk('contact/updateContact', async (data) => {
    const response = await axios.put(API_URL, data);
    return response.data.contact;
});

// Add new contact
export const addContact = createAsyncThunk('contact/addContact', async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data.contact;
});

// Delete contact
export const deleteContact = createAsyncThunk('contact/deleteContact', async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
});

const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        contact: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contact = action.payload;
            })
            .addCase(fetchContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.contact = action.payload;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contact = action.payload;
            })
            .addCase(deleteContact.fulfilled, (state) => {
                state.contact = null;
            });
    },
});

export default contactSlice.reducer;
