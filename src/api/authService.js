import api from './axiosConfig';

// Register a new user
export const registerUser = async (formData) => {
  try {
    const response = await api.post('/auth/register', formData);
    return response.data;
  } catch (error) {
    // Handle errors, e.g., show a user-friendly message
    console.error("Registration failed:", error);
    throw error; // Re-throw to allow components to handle the error
  }
};

// Login an existing user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Logout (clears refresh token cookie on server)
export const logoutUser = async () => {
  try {
    const response = await api.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

// Get new access token using refresh token
export const refreshAccessToken = async () => {
  try {
    const response = await api.get('/auth/refresh-token'); // cookie is sent automatically
    return response.data;
  } catch (error) {
    console.error("Refresh token request failed:", error);
    throw error;
  }
};

