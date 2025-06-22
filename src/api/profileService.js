import api from './axiosConfig';

/**
 * Get profile by ID
 * @param {string} profileId - ID of the profile to fetch
 * @returns {Promise<Object>} Profile data
 * @throws {Error} With meaningful message based on error type
 */
export const getProfileById = async (profileId) => {
    try {
        const { data } = await api.get(`/profile/${profileId}`);
        return data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        // Handle specific error cases
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error('Authentication required. Please log in again.');
            }
            if (error.response.status === 404) {
                throw new Error('Profile not found');
            }
            throw new Error(error.response.data?.message || 'Failed to fetch profile');
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('An unexpected error occurred');
        }
    }
};

/**
 * Get current user's profile with enhanced error handling
 * @returns {Promise<Object>} Current user's profile data
 * @throws {Error} With proper authentication/network messages
 */
export const getMyProfile = async () => {
    try {
        const { data } = await api.get('/profile/me');
        return data;
    } catch (error) {
        console.error('Error fetching my profile:', error);
        // Special handling for authentication errors
        if (error.response?.status === 401) {
            // Return special object to trigger auth flow in components
            return { error: 'Authentication failed' };
        }
        if (error.response) {
            throw new Error(error.response.data?.message || 'Failed to fetch profile data');
        } else if (error.request) {
            throw new Error('Network error. Please check your internet connection');
        } else {
            throw new Error('Failed to load profile due to unexpected error');
        }
    }
};

/**
 * Update current user's profile with enhanced FormData handling
 * @param {Object} profileData - Profile data to update
 * @param {File|null} imageFile - Optional profile image file
 * @param {AbortSignal} [signal] - Optional abort signal for cancellation
 * @returns {Promise<Object>} Updated profile data
 * @throws {Error} With detailed error message
 */
export const updateMyProfile = async (profileData, imageFile = null, signal = null) => {
    // Configuration constants
    const PROFILE_FIELDS = {
        USER: ['fullName', 'email', 'phoneNumber', 'location'],
        PROFILE: ['occupation', 'dateOfBirth', 'sex', 'membership_status', 'bio']
    };
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
    const API_TIMEOUT = 10000; // 10 seconds
    const MAX_RETRIES = 2;

    try {
        const formData = buildFormData(profileData, imageFile);
        const response = await executeApiRequest(formData, signal);
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }

    // Helper functions
    function buildFormData(data, file) {
        const formData = new FormData();
        const allFields = [...PROFILE_FIELDS.USER, ...PROFILE_FIELDS.PROFILE];

        allFields.forEach(field => {
            if (data[field] != null) {
                formData.append(field,
                    field === 'dateOfBirth' && data[field] instanceof Date
                        ? data[field].toISOString()
                        : data[field]
                );
            }
        });

        if (file) {
            validateImageFile(file);
            formData.append('profileImage', file);
        }

        return formData;
    }

    function validateImageFile(file) {
        if (!(file instanceof File)) {
            throw new Error('Invalid file object provided');
        }
        if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File size too large. Max ${MAX_FILE_SIZE / 1024 / 1024}MB allowed.`);
        }
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            throw new Error(`Invalid file type. Only ${ALLOWED_FILE_TYPES.join(', ')} allowed.`);
        }
    }

    async function executeApiRequest(formData, signal, retryCount = 0) {
        try {
            return await api.put('/profile/me', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Request-ID': crypto.randomUUID?.() || Date.now().toString(),
                },
                timeout: API_TIMEOUT,
                signal,
                onUploadProgress: progress => {
                    const percent = Math.round((progress.loaded * 100) / progress.total);
                    console.debug(`Upload progress: ${percent}%`);
                }
            });
        } catch (error) {
            if (shouldRetry(error) && retryCount < MAX_RETRIES) {
                await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
                return executeApiRequest(formData, signal, retryCount + 1);
            }
            throw error;
        }
    }

    function shouldRetry(error) {
        return (
            error.code === 'ECONNABORTED' || // Timeout
            error.response?.status >= 500 || // Server errors
            !error.response // Network errors
        );
    }

    function handleApiError(error) {
        // Handle network/abort errors
        if (error.name === 'AbortError') return new Error('Request cancelled');
        if (error.code === 'ECONNABORTED') return new Error('Request timeout');
        if (error.request && !error.response) return new Error('Network error');

        // Handle API response errors
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message ||
                error.response.data?.error ||
                'Profile update failed';

            switch (status) {
                case 400: return new Error(`Validation error: ${message}`);
                case 401: return new Error('Session expired. Please log in again.');
                case 403: return new Error('You do not have permission to update this profile.');
                case 413: return new Error('File size too large. Max 2MB allowed.');
                case 500:
                default: return new Error(message);
            }
        }

        // Re-throw any other errors (including our validation errors)
        return error;
    }
};
/**
 * Delete current user's profile
 * @returns {Promise<Object>} Success message
 * @throws {Error} With detailed error message
 */
export const deleteMyProfile = async () => {
    try {
        const { data } = await api.delete('/profile/me');
        return data;
    } catch (error) {
        console.error('Profile deletion error:', error);
        if (error.response) {
            if (error.response.status === 401) {
                throw new Error('Authentication required to delete profile.');
            }
            throw new Error(error.response.data?.message || 'Failed to delete profile');
        } else if (error.request) {
            throw new Error('Network error. Please check your connection.');
        } else {
            throw new Error('Failed to delete profile due to unexpected error');
        }
    }
};