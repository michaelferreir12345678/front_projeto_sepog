const API_URL = 'http://127.0.0.1:5000/';

export const register = async (username, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    return response.json();
};

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        return data; // Retorna os dados apenas uma vez, não precisa chamar response.json() novamente
    } else {
        throw new Error('Failed to login'); // Trate erros de login aqui
    }
};


export const logout = async () => {
    await fetch(`${API_URL}/logout`, { method: 'GET' });
    localStorage.removeItem('user');
};

export const getProfile = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });
    return response.json();
};

export const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
};
