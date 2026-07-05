# 📚 Artigos - Frontend

Frontend da plataforma **Artigos**, desenvolvido com **React**, **TypeScript** e **Vite**.

Este projeto é responsável pela interface da aplicação, permitindo que os usuários realizem autenticação, publiquem artigos, interajam com conteúdos e gerenciem suas informações.

O frontend consome a API desenvolvida em **NestJS**, disponível no repositório do backend.

---

## 🚀 Tecnologias

- React
- TypeScript
- Vite
- React Router DOM
- TanStack Query (React Query)
- Axios
- Tailwind CSS
- Lucide React

---

## 📁 Estrutura do Projeto

```text
src/
├── assets/
├── components/
├── hooks/
├── pages/
├── routes/
├── services/
├── styles/
├── utils/
├── App.tsx
└── main.tsx
```

---

## ⚙️ Pré-requisitos

Antes de iniciar o projeto, certifique-se de possuir instalado:

- Node.js 20+
- pnpm (ou npm)

---

## 📦 Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Acesse a pasta:

```bash
cd artigo-front
```

Instale as dependências:

```bash
pnpm install
```

---

## ▶️ Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

O projeto ficará disponível em:

```
http://localhost:5173
```

---

## 🔗 Backend

Este projeto depende da API desenvolvida em NestJS.

Configure a URL da API através do arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000
```

Caso o backend esteja utilizando outra porta, basta alterar o valor da variável.

---

## ✨ Funcionalidades

- Autenticação de usuários
- Login com e-mail e senha
- Cadastro de usuários
- Consumo da API utilizando Axios
- Gerenciamento de estado assíncrono com TanStack Query
- Rotas públicas e privadas
- Interface responsiva
- Componentes reutilizáveis

---

## 🛠️ Scripts

Executar o projeto:

```bash
pnpm dev
```

Gerar build de produção:

```bash
pnpm build
```

Visualizar build:

```bash
pnpm preview
```

Executar o linter:

```bash
pnpm lint
```

---

## 📌 Arquitetura

O projeto foi estruturado visando escalabilidade e organização, seguindo uma divisão por responsabilidades:

- **components** → Componentes reutilizáveis.
- **pages** → Telas da aplicação.
- **routes** → Gerenciamento das rotas públicas e privadas.
- **services** → Comunicação com a API.
- **hooks** → Hooks customizados.
- **styles** → Estilos globais.

---

## 🎯 Objetivo

Este projeto faz parte da plataforma **Artigos**, cujo objetivo é disponibilizar um ambiente para criação, gerenciamento e leitura de artigos, oferecendo uma experiência moderna, responsiva e de fácil utilização.

---

## 👨‍💻 Autor

Desenvolvido por **Guilherme Parente**.
