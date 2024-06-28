import React, { useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';
import * as AuthService from '../../service/AuthService';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const toast = useRef(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const fazerLogin = async () => {
        setLoading(true);
        try {
            await AuthService.login(email, password);
            toast.current.show({ severity: 'success', summary: 'Sucesso', detail: 'Login bem-sucedido', life: 3000 });
            history.push('/');
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Credenciais inválidas', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '100px' }} className=" flex flex-column align-items-center justify-content-center">
            <Toast ref={toast} />
            {/* <img src='assets/layout/images/logo-pref.png' style={{ marginBottom: '10px', borderRadius: '10px' }} /> */}
            <div style={{ marginTop: '10px', borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                    <div className="text-center mb-5">
                        {/* <img src='images/logo_SGprev.png' style={{ width: '180px', marginBottom: '10px', borderRadius: '10px' }} /> */}
                        <div className="text-900 text-3xl font-medium mb-3">Bem vindo ao Portal da Folha!</div>
                        <span className="text-600 font-medium">Entrar para continuar</span>
                    </div>

                    <div>
                        <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                            Email
                        </label>
                        <InputText inputid="email1" type="email" placeholder="Endereço de Email" onChange={(e) => setEmail(e.target.value)} className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                        <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                            Senha
                        </label>
                        <Password inputid="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" toggleMask className="w-full mb-5" inputClassName='w-full p-3 md:w-30rem'></Password>

                        <div className="flex align-items-center justify-content-between mb-5 gap-5">
                            <div className="flex align-items-center">
                                <Checkbox inputid="rememberme1" value={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox>
                                <label htmlFor="rememberme1">
                                    Lembrar de mim
                                </label>
                            </div>
                        </div>
                        <Button loading={loading} onClick={fazerLogin} label="Entrar" className="w-full p-3 text-xl" ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(AuthForm, comparisonFn);
