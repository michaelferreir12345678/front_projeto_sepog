import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
// import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState('');
    // const [objetoDialog, setObjetoDialog] = useState(false);
    // const [objetoDialogCodigoRecuperarSenha, setObjetoDialogCodigoRecuperarSenha] = useState(false);
    // const [dialogCadastroNovaSenha, setDialogCadastroNovaSenha] = useState(false);
    // const [codigoRecuperarSenha, setCodigoRecuperarSenha] = useState('');
    // const [novaSenha, setNovaSenha] = useState('');
    const toast = useRef(null);
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
            history.push('/');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Usuário ou senha incorretos.');
        }
    };

    // const openNew = () => {
    //     setObjetoDialog(true);
    // };

    // const hideDialog = () => {
    //     setObjetoDialog(false);
    //     setObjetoDialogCodigoRecuperarSenha(false);
    //     setDialogCadastroNovaSenha(false);
    // };

    // const objetoDialogFooter = (
    //     <Button label="Enviar" icon="pi pi-check" onClick={() => setObjetoDialogCodigoRecuperarSenha(true)} />
    // );

    // const objetoCodigoRecuperarSenhaFooter = (
    //     <Button label="Enviar" icon="pi pi-check" onClick={() => setDialogCadastroNovaSenha(true)} />
    // );

    // const objetoEnvioNovaSenhaFooter = (
    //     <Button label="Salvar" icon="pi pi-check" onClick={() => toast.current.show({ severity: 'success', summary: 'Senha alterada', detail: 'Sua senha foi alterada com sucesso!' })} />
    // );

    return (
        <div>
            <div className="flex flex-column align-items-center justify-content-center">
                <Toast ref={toast} />
                {/* <img src='assets/layout/images/logo-pref.png' style={{ marginBottom: '10px', borderRadius: '10px' }} /> */}
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
                                    {/* <a onClick={openNew} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                        Esqueceu sua senha?
                                    </a> */}
                                </div>
                                {error && <div className="p-error">{error}</div>}
                                <Button
                                    type="submit"
                                    label="Entrar"
                                    className="w-full p-3 text-xl"
                                    style={{ backgroundColor: '#ffc107', borderColor: '#ffc107', color: '#000', marginBottom: '10px' }}
                                />
                            </div>
                        </form>
                        <span>Copyright© 2024 | Prefeitura de Fortaleza - SEPOG</span>
                    </div>
                </div>

                {/* <Dialog visible={objetoDialog} style={{ width: '450px' }} header="Recuperar Senha" modal className="p-fluid" footer={objetoDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="email">Insira seu email cadastrado</label>
                        <InputText type="email" id="email" onChange={(e) => setUsername(e.target.value)} required autoFocus />
                    </div>
                </Dialog>
                <Dialog visible={objetoDialogCodigoRecuperarSenha} style={{ width: '450px' }} header="Código de recuperação" modal className="p-fluid" footer={objetoCodigoRecuperarSenhaFooter} onHide={hideDialog}>
                    <div className="field">
                        <label required htmlFor="email">Insira o código enviado para seu email</label>
                        <InputText required type="text" id="text" onChange={(e) => setCodigoRecuperarSenha(e.target.value)} autoFocus />
                    </div>
                </Dialog>
                <Dialog visible={dialogCadastroNovaSenha} style={{ width: '450px' }} header="Nova senha: " modal className="p-fluid" footer={objetoEnvioNovaSenhaFooter} onHide={hideDialog}>
                    <div className="field">
                        <label required htmlFor="email">Insira sua nova senha: </label>
                        <Password required type="password" id="password" onChange={(e) => setNovaSenha(e.target.value)} autoFocus />
                    </div>
                </Dialog> */}
            </div>
            
        </div>
    );
};

export default LoginPage;
