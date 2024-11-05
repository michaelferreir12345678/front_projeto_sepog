/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
// import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');
    const [showProgressSpinner, setShowProgressSpinner] = useState(false);
    const toast = useRef(null);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setShowProgressSpinner(true);
            const response = await axios.post('http://127.0.0.1:5000/login', {
                username,
                password
            });
            const { token } = response.data;
            localStorage.setItem('user', JSON.stringify({ token }));
            history.push('/');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Usuário ou senha incorretos.');
            setShowProgressSpinner(false);
        }
    };

    return (
        <div>
            <div className="flex flex-column align-items-center justify-content-center">
                <Toast ref={toast} />
                <div style={{ marginTop: '10px', borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, #ffc107 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src='assets/layout/images/logo-pref.png' style={{ width: '180px', marginBottom: '10px', borderRadius: '10px' }} />
                            <div className="text-900 text-3xl font-medium mb-3">Bem vindo ao Portal da Folha!</div>
                            <span className="text-600 font-medium">Entrar para continuar</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block text-900 text-xl font-medium mb-2">
                                    Usuário
                                </label>
                                <InputText id="username" type="text" placeholder="Insira seu Usuário" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                                <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                    Senha
                                </label>
                                <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem" />

                                <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                    <div className="flex align-items-center">
                                        <Checkbox id="rememberme1" value={checked} onChange={(e) => setChecked(e.checked)} className="mr-2" />
                                        <label htmlFor="rememberme1">
                                            Lembrar de mim
                                        </label>
                                    </div>
                                </div>
                                {error && <div className="p-error">{error}</div>}
                                <Button
                                    type="submit"
                                    label={
                                        showProgressSpinner ? (
                                            <div style={{display: 'inline-block' }}>
                                                <span style={{ marginRight: '10px' }}>Entrando...</span>
                                                <ProgressSpinner style={{ width: '15px', height: '15px' }}  fill="#ffc107" animationDuration=".5s" />
                                            </div>
                                        ) : (
                                            'Entrar'
                                        )
                                    }
                                    className="p-button-raised p-button-rounded w-full p-3 text-xl"
                                    style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000', marginBottom: '10px', position: 'relative' }}
                                    disabled={showProgressSpinner}
                                />
                                <span>Copyright© 2024 | Prefeitura de Fortaleza - SEPOG</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LoginPage;
