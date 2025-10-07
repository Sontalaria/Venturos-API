Etec Bento Quirino
2* Desenvolvimento de Sistemas

Feito Por:
Kennay Vansan
João Canazza

# API de Adoção e Tutoria de Animais
API RESTful desenvolvida em **Node.js** com **Express**, **Sequelize** e **SQLite** para gerenciar animais disponíveis para adoção, usuários/tutores, pedidos de adoção, doações e questionários de perfil.

## Estrutura do Projeto
src/
  app.js              # Configuração principal do Express
  server.js           # Inicialização do servidor
  config/
    config.js         # Configuração do banco de dados
  models/
    index.js          # Ponto central dos modelos
    Animal.js
    Usuario.js
    Questionario.js
    PedidoAdocao.js
    Doacao.js
  controllers/
    animalController.js
    usuarioController.js
    questionarioController.js
    pedidoAdocaoController.js
    doacaoController.js
  routes/
    index.js
    animalRoutes.js
    usuarioRoutes.js
    questionarioRoutes.js
    pedidoAdocaoRoutes.js
    doacaoRoutes.js

## Tecnologias Utilizadas
- Node.js
- Express
- Supabase
- SQLite
- nodemon (dev)
- dotenv 

## Como Rodar o Projeto
1. Clone o repositório:
   git clone https://github.com/seu-usuario/my-animal-api.git
   cd my-animal-api

2. Instale as dependências:
   npm install
   
3. Rode a API:
   npm run dev   # com nodemon
   # ou
   npm start 

A API estará disponível em: http://localhost:3000/api

## Endpoints Principais
### Animais
- GET /api/animais → lista todos os animais
- POST /api/animais → cadastra um novo animal
- GET /api/animais/:id → busca um animal por ID
- PUT /api/animais/:id → atualiza informações do animal
- DELETE /api/animais/:id → remove um animal

### Usuários
- GET /api/usuarios → lista todos os usuários
- POST /api/usuarios → cria novo usuário
- GET /api/usuarios/:id → busca usuário por ID
- PUT /api/usuarios/:id → atualiza usuário
- DELETE /api/usuarios/:id → remove usuário

### Questionários
- GET /api/questionarios → lista questionários
- POST /api/questionarios → cria questionário
- GET /api/questionarios/:id → busca por ID

### Pedidos de Adoção
- GET /api/pedidos → lista pedidos
- POST /api/pedidos → cria pedido de adoção
- GET /api/pedidos/:id → busca pedido por ID

### Doações
- GET /api/doacoes → lista doações
- POST /api/doacoes → registra nova doação
- GET /api/doacoes/:id → busca doação por ID

## Exemplos de Requisição
### Criar Usuário
curl -X POST http://localhost:3000/api/usuarios \
-H "Content-Type: application/json" \
-d '{
  "nome_completo": "João Silva",
  "email": "joao@example.com",
  "senha": "123456",
  "cidade": "São Paulo",
  "estado": "SP",
  "idade": 30,
  "telefone": "11999999999"
}'

### Criar Animal
curl -X POST http://localhost:3000/api/animais \
-H "Content-Type: application/json" \
-d '{
  "nome": "Rex",
  "especie": "Cachorro",
  "porte": "Médio",
  "descricao": "Cachorro dócil e brincalhão",
  "castrado": true,
  "vacinado": true
}'

## Relacionamentos
- Um Usuário pode ter 1 Questionário
- Um Usuário (Tutor) pode ter vários Pedidos de Adoção
- Um Animal pode estar em vários Pedidos de Adoção
- Uma Doação é vinculada a um doador (nome/email)

## Licença
Este projeto é livre para fins de estudo e aprendizado.
Sinta-se à vontade para adaptar e exndir. 
