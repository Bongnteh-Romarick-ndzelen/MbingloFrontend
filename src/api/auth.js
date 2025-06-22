export const getAuthToken = () => {
    return localStorage.getItem('accessToken');
};

export const setAuthToken = (token) => {
    localStorage.setItem('accessToken', token);
};

export const removeAuthToken = () => {
    localStorage.removeItem('accessToken');
};