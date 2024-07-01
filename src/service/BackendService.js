import axios from 'axios';

const BackendService = {
    processInconsistencies: async (formData) => {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            const response = await axios.post('https://54.146.161.225/processar_inconsistencia', formData, {
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
            const response = await axios.post('https://54.146.161.225/processar_erros', formData, {
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
            const response = await axios.post('https://54.146.161.225/processar_arquivo', formData, {
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
    }
};

export default BackendService;
