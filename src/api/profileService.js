import api from './axiosConfig';

// Get logged-in user's profile
export const getUserProfile = async () => {
    try {
    const response = await api.get('/profile/me');
    return response.data;
    } catch (error) {
        console.error("Failed to fetch user profile:", error);
        throw error;
    }
};

// Update logged-in user's profile
export const updateUserProfile = async (profileData) => {
    const formData = new FormData();
    for (const key in profileData) {
        if (profileData[key] !== null && profileData[key] !== undefined) { // Added null and undefined check
            formData.append(key, profileData[key]);
        }
    }
    try {
    const response = await api.put('/profile/me', formData);
    return response.data;
    } catch (error) {
        console.error("Failed to update user profile:", error);
        throw error;
    }
};
