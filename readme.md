<h2 align="center">
    Api Solid
</h2>

<p align="center">
  <a href="#tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-informações">Informações</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-rodar-o-projeto">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-scripts-disponíveis">Scripts</a>
</p>

---

## 💻 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Vitest](https://vitest.dev/)

Extras:

- [Docker](https://www.docker.com/)
- [ESLint](https://eslint.org/)

---

## ℹ️ Informações

O **api-solid** é uma API desenvolvida em **TypeScript** que segue os princípios do **SOLID** para garantir código limpo, escalável e de fácil manutenção.

Ela utiliza o **Prisma** como ORM para interagir com o banco de dados, possibilitando:

- Definição de modelos;
- Execução de migrações;
- Operações CRUD seguras com tipagem estática.

Outros pontos de destaque:

- Configuração via `.env.example`
- Pronta para rodar em containers com **Docker** (`docker-compose`)
- Testes unitários configurados com **Vitest**
- Integração contínua (**CI/CD**) já preparada

---

## ⚙️ Como rodar o projeto

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/MarquisAlexander/api-solid.git
   cd api-solid

   ```

2. **Instalar dependências**
   ```bash
   npm install
   ```
3. **Configurar variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto e adicione as variáveis conforme o arquivo `.env.example`.
4. **Executar migrações do Prisma**
   ```bash
   npx prisma migrate dev
   ```
5. **Iniciar o servidor**
   ```bash
   npm run dev
   ```
6. **Rodar com Docker**
   ```bash
   docker-compose up --build
   ```

## 📜 Scripts disponíveis

### dev → roda o servidor em modo desenvolvimento (watch)

### build → transpila TypeScript para JavaScript

### start → inicia a versão buildada

### prisma:migrate → executa migrações

### prisma:generate → gera cliente Prisma

## 📌 Exemplos de Endpoints

Abaixo alguns exemplos de requisições que podem ser feitas na API.

> As rotas podem variar de acordo com a versão atual do projeto.

---

### 👤 Usuários

#### ➡️ Criar usuário

```http
POST /users
Body (JSON): {
  "name": "Marquis Alexander",
  "email": "marquis@example.com",
  "password": "123456"
}
{
  "id": "user_123456",
  "name": "Marquis Alexander",
  "email": "marquis@example.com",
  "createdAt": "2025-09-15T12:00:00.000Z"
}
```

#### ➡️ Listar usuários

```http
GET /users
[
Body (JSON): {
    "id": "user_123456",
    "name": "Marquis Alexander",
    "email": "marquis@example.com"
  },
  {
    "id": "user_654321",
    "name": "Outro Usuário",
    "email": "outro@example.com"
  }
]
```

#### ➡️ Obter detalhes de um usuário

```http
GET /users/:id
GET /users/user_123456
Body (JSON): {
  "id": "user_123456",
  "name": "Marquis Alexander",
  "email": "marquis@example.com"
}
```

#### ➡️ Login

```http
POST /sessions
Body (JSON): {
  "email": "marquis@example.com",
  "password": "123456"
}
Response (200): {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

```
