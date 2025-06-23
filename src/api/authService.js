import api from './axiosConfig';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);

    // Ensure consistent response structure
    // Check if response data is present
    // and if it contains the expected fields
    if (!response.data) {
      throw new Error('No data received from server');
    }

    return {
      token: response.data.token || response.data.accessToken,
      user: {
        id: response.data.user?.id || response.data.user?._id,
        email: response.data.user?.email || userData.email,
        role: response.data.user?.role || 'user',
        phoneNumber: response.data.user?.phoneNumber || userData.phoneNumber,
        location: response.data.user?.location || userData.location
      }
    };
  } catch (error) {
    console.error('Registration Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });

    // Create enhanced error object
    const err = new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Registration failed. Please try again.'
    );

    // Attach additional details
    err.status = error.response?.status;
    err.errors = error.response?.data?.errors;
    throw err;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);

    return {
      token: response.data.token || response.data.accessToken,
      user: {
        id: response.data.user?.id || response.data.user?._id,
        email: response.data.user?.email || credentials.email,
        role: response.data.user?.role || 'user'
      }
    };
  } catch (error) {
    console.error('Login Error:', error.response?.data);
    const err = new Error(
      error.response?.data?.message ||
      'Invalid credentials. Please try again.'
    );
    err.status = error.response?.status;
    throw err;
  }
};

export const refreshAccessToken = async () => {
  try {
    const response = await api.get('/auth/refresh-token');

    return {
      token: response.data.token || response.data.accessToken
    };
  } catch (error) {
    console.error('Token Refresh Error:', error.response?.data);

    // Clear invalid token
    localStorage.removeItem('accessToken');

    const err = new Error(
      error.response?.data?.message ||
      'Session expired. Please login again.'
    );
    err.status = error.response?.status;
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    return true;
  } catch (error) {
    console.error('Logout Error:', error.response?.data);

    // Force cleanup even if API fails
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    throw error;
  }
};