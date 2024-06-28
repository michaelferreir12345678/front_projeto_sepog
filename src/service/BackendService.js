import axios from 'axios';

const BackendService = {
    processInconsistencies: async (formData) => {
        try {
            const response = await axios.post('https://pasteldoreino.com.br/processar_arquivo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
            const response = await axios.post('https://pasteldoreino.com.br/processar_erros', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
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
            const response = await axios.post('https://pasteldoreino.com.br/testes_arquivo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response;
        } catch (error) {
            console.error('Erro ao realizar upload:', error);
            throw error;
        }
    }
}

export default BackendService;
