// src/api/authService.js
import api from './axiosConfig';

// Register a new user
export const registerUser = async (formData) => {
    const response = await api.post('/auth/register', formData);
    return response.data;
};

// Login an existing user
export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// Logout (clears refresh token cookie on server)
export const logoutUser = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

// Get new access token using refresh token
export const refreshAccessToken = async () => {
    const response = await api.get('/auth/refresh-token'); // cookie is sent automatically
    return response.data;
};
