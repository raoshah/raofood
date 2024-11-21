import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../x';

export const sendEmail = createAsyncThunk('auth/sendEmail', async (emailData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/send-email-otp/`, emailData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to send email OTP');
    }
});

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async (otpData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/verify-email-otp/`, otpData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Failed to verify email OTP');
    }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/register/`, userData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Registration failed');
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, thunkAPI) => {
    try {
        const response = await axios.post(`${API_URL}/api/user/login/`, loginData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || 'Login failed');
    }
});

const initialState = {
    user: null,
    authToken: null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.authToken = null;
            state.error = null;
            state.isLoading = false; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendEmail.pending, (state) => {
                state.user = null;
                state.authToken = null;
                state.error = null;
                state.isLoading = true; 
            })
            .addCase(sendEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(verifyEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload; 
                state.authToken = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
