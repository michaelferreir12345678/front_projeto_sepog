// src/service/authService.js
const API_URL = 'http://127.0.0.1:5000';

export const register = async (user) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    return response.json();
};

export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    return data;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getProfile = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        const response = await fetch(`${API_URL}/profile`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });
        return response.json();
    }
    return null;
};

export const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.token;
};
