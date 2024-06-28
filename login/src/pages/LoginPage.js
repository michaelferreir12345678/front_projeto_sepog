import React from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../services/AuthService';

const LoginPage = ({ history }) => {
    const handleLogin = async (username, password) => {
        const response = await login(username, password);
        if (response.message === 'Logged in successfully') {
            history.push('/profile');
        } else {
            alert('Login failed');
        }
    };

    return <AuthForm onSubmit={handleLogin} buttonText="Login" />;
};

export default LoginPage;
