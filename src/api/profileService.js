// src/api/profileService.js
import api from './axiosConfig';

// Get logged-in user's profile
export const getUserProfile = async () => {
    const response = await api.get('/profile/me');
    return response.data;
};

// Update logged-in user's profile
export const updateUserProfile = async (profileData) => {
    const formData = new FormData();

    for (const key in profileData) {
        if (profileData[key]) {
            formData.append(key, profileData[key]);
        }
    }

    const response = await api.put('/profile/me', formData);
    return response.data;
};


