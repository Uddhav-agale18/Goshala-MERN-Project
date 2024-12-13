import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define API_URL
const API_URL = 'http://localhost:5000/api/about';

// Initial state
const initialState = {
  about: null, // holds the about data
  loading: false,
  error: null,
};

// Async thunk for fetching about data
export const fetchAbout = createAsyncThunk('about/fetchAbout', async () => {
  try {
    const response = await axios.get(API_URL); // Use API_URL here
    return response.data; // Assuming the API returns the about data
  } catch (error) {
    throw Error(error.message);
  }
});

// Async thunk for updating about data
export const updateAbout = createAsyncThunk('about/updateAbout', async (aboutData) => {
  try {
    const response = await axios.put(`${API_URL}/${aboutData.id}`, aboutData); // Use API_URL here
    return response.data; // Assuming the API returns the updated about data
  } catch (error) {
    throw Error(error.message);
  }
});

// Async thunk for deleting about data
export const deleteAbout = createAsyncThunk('about/deleteAbout', async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`); // Use API_URL here
    return id; // Return the id to remove it from the state
  } catch (error) {
    throw Error(error.message);
  }
});

// Async thunk for creating about data
export const createAbout = createAsyncThunk('about/createAbout', async (aboutData) => {
  try {
    const response = await axios.post(API_URL, aboutData); // Use API_URL here
    return response.data; // Assuming the API returns the created about data
  } catch (error) {
    throw Error(error.message);
  }
});

// Slice definition
const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
      })
      .addCase(updateAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAbout.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted about from the state
        state.about = null;
      })
      .addCase(deleteAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAbout.fulfilled, (state, action) => {
        state.loading = false;
        // Add the newly created about data to the state (optional, if you need it)
        state.about = action.payload;
      })
      .addCase(createAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default aboutSlice.reducer;
