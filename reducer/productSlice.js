import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../x';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/raofood/get-products/`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data || error.message || 'Failed to fetch products'
        );
    }
});

const initialState = {
    products: null,
    isLoading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.products = null;
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.products = null;
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
