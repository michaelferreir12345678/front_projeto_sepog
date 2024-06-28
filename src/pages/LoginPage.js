import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username,
                password
            });
            const { token } = response.data;
            localStorage.setItem('user', JSON.stringify({ token }));
            history.push('/'); // Redireciona para a página principal após o login
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Usuário ou senha incorretos.');
        }
    };

    return (
        <div className="card">
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Username</label>
                            <InputText id="username" type="text" className="w-12rem" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Password</label>
                            <InputText id="password" type="password" className="w-12rem" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {error && <div className="p-error">{error}</div>}
                        <Button type="submit" label="Login" icon="pi pi-user" className="w-10rem mx-auto mt-3"></Button>
                    </form>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>OR</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>OR</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem"></Button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
