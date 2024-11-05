import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

axios.defaults.baseURL = `${backendUrl}`;

const BackendService = {
    processInconsistencies: async (formData) => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await axios.post('/processar_inconsistencia', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Erro ao processar arquivos:', error);
            throw error;
        }
    },

    processErrors: async (formData) => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await axios.post('/processar_erros', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Erro ao processar erros:', error);
            throw error;
        }
    },

    processFiles: async (formData) => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await axios.post('/processar_arquivo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Erro ao realizar upload:', error);
            throw error;
        }
    },

    calculateSalaryImpact: async (data) => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await axios.post('/employees/predict_increase', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Resposta do backend:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao calcular impacto salarial:', error);
            throw error;
        }
    },

    globalSearch: async (query) => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await axios.get(`/search?q=${query}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error('Erro ao realizar a pesquisa global:', error);
            throw error;
        }
    },

    searchUsers: async (term) => {
        try {
            const response = await axios.get(`/search/users?q=${term}`);
            return response.data; 
        } catch (error) {
            console.error('Erro ao pesquisar usuários:', error);
            throw error;
        }
    },

    searchGroups: async (term) => {
        try {
            const response = await axios.get(`/search/groups?q=${term}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao pesquisar grupos:', error);
            throw error;
        }
    },

    searchFunctions: async (groupId) => {
        try {
            const response = await axios.get(`/search/functions/${groupId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao pesquisar funções:', error);
            throw error;
        }
    },

    searchCompanies: async (term) => {
        try {
            const response = await axios.get(`/search/companies?q=${term}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao pesquisar empresas:', error);
            throw error;
        }
    },
    
};

export default BackendService;
