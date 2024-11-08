import React from 'react';
import AuthForm from '../components/AuthForm';
import { register } from '../services/AuthService';

const RegisterPage = ({ history }) => {
    const handleRegister = async (username, password) => {
        const response = await register(username, password);
        if (response.message === 'User created successfully') {
            history.push('/login');
        } else {
            alert('Registration failed');
        }
    };

    return <AuthForm onSubmit={handleRegister} buttonText="Register" />;
};

export default RegisterPage;
