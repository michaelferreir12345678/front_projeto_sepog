import React, { useState, useEffect } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

const UserTreeTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [treeTableData, setTreeTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const API_URL = process.env.REACT_APP_BACKEND_URL;


    const fetchData = async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/search/users?q=${query}`);
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (users.length > 0) {
            const convertToTreeTableData = (users) => {
                return users.flatMap((user) => ({
                    key: `user_${user.id}`,
                    data: {
                        nome: user.nome,
                        descricao: null, 
                        empresa: null,
                    },
                    children: user.gruposSeguranca.map((grupo) => ({
                        key: `grupo_${grupo.id}`,
                        data: {
                            descricao: grupo.descricao,
                            empresa: grupo.empresa, 
                        },
                        children: grupo.funcoes.map((funcao) => ({
                            key: `funcao_${funcao.id}`,
                            data: {
                                descricao: funcao.descricao,
                            }
                        }))
                    }))
                }));
            };

            setTreeTableData(convertToTreeTableData(users));
        } else {
            setTreeTableData([]); 
        }
    }, [users]);

    const handleSearch = () => {
        if (searchTerm.trim()) {
            fetchData(searchTerm);
        }
    };

    return (
        <div className="card">
            <h3>Pesquisa por Usuários</h3>

            <div className="p-inputgroup" style={{ marginBottom: '20px' }}>
                <InputText
                    placeholder="Digite o nome do usuário"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button label="Pesquisar" icon="pi pi-search" onClick={handleSearch} />
            </div>

            <TreeTable value={treeTableData} loading={loading}>
                <Column field="nome" header="Usuário" expander></Column>
                <Column field="descricao" header="Grupo"></Column>
                <Column field="empresa" header="Empresa"></Column>
                </TreeTable>
        </div>
    );
};

export default UserTreeTable;
