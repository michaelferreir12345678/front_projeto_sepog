import axios from 'axios';

// Configure a URL base do axios
axios.defaults.baseURL = 'http://172.21.245.204:5000/';

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
            throw error; // Certifique-se de lançar o erro para tratamento adequado no componente que chamou essa função.
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

    // Adicione a nova função para calcular o impacto salarial
    calculateSalaryImpact: async (data) => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await axios.post('/employees/predict_increase', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Resposta do backend:', response.data); // Adicione esta linha para debug
            return response.data;
        } catch (error) {
            console.error('Erro ao calcular impacto salarial:', error);
            throw error;
        }
    },
};

export default BackendService;
