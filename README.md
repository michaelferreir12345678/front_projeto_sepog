# Portal da Folha - Prefeitura de Fortaleza

Este projeto é uma aplicação frontend para o Portal da Folha da Prefeitura de Fortaleza, permitindo que funcionários municipais façam login e acessem informações relacionadas à folha de pagamento. 

### Estrutura do Projeto

- `src/components/`: Contém todos os componentes reutilizáveis da aplicação, como formulários, tabelas, e mensagens de erro.

- `src/pages/`: Contém as páginas principais da aplicação.

- `src/service/`: Lida com a comunicação com o backend, incluindo serviços de autenticação e chamadas de API.


### Dependências Principais

- `React`: Biblioteca JavaScript para construção de interfaces de usuário.
- `PrimeReact`: Biblioteca de componentes para design de interfaces de usuário.
- `Axios`: Utilizada para realizar chamadas HTTP para a API backend.

### Configuração de Ambiente

- `REACT_APP_API_BASE_URL`: A URL base para o backend.
- Exemplo de arquivo `.env`:

### Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/repo.git

2. Navegue até o diretório do projeto:

cd portal-da-folha

3. Instale as dependências:

npm install

4. Configure as variáveis de ambiente: Crie um arquivo .env na raiz do projeto e adicione a variável REACT_APP_API_BASE_URL com a URL do backend.

REACT_APP_API_BASE_URL=https://api.seuservidor.com

5. Execute a aplicação em modo de desenvolvimento:

npm start

6. Para preparar o projeto para produção, use:

npm run build


---

### Passo 3: Publicação em Produção

#### 1. **Criação do Build de Produção**

Certifique-se de que o build está pronto para o ambiente de produção:
```bash
npm run build


