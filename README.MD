# Desafio Técnico

Este repositório contém o código para o projeto Desafio Técnico.
Este guia irá orientá-lo sobre como baixar o código, instalar as dependências e configurar os arquivos de ambiente.

## Índice

- [Pré-requisitos](#pré-requisitos)
- [Clone o repositório](#clone-o-repositório)
- [Instalação das dependências](#instalação-das-dependências)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Executando o projeto](#executando-o-projeto)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (ou outro banco de dados compatível, se necessário)

## Clone o repositório

Para clonar o repositório, abra o terminal e execute o seguinte comando:

```bash
git clone https://github.com/GustQueiroz/DesafioTecnicoClinicas
```

## Instalação das dependências

Após clonar o repositório, navegue até o diretório do projeto e instale as dependências para o backend e frontend.

### Backend

1. Navegue até o diretório do backend:

   ```bash
   cd desafiotecnico/backend
   ```

2. Instale as dependências:

   ```bash
   npm install --force
   ```

   ou, se você estiver usando o Yarn:

   ```bash
   yarn install
   ```

### Frontend

1. Navegue até o diretório do frontend:

   ```bash
   cd ../frontend
   ```

2. Instale as dependências:

   ```bash
   npm install --force
   ```

   ou, se você estiver usando o Yarn:

   ```bash
   yarn install
   ```

## Configuração do ambiente

O projeto utiliza arquivos `.env` para armazenar variáveis de ambiente. Você precisará criar esses arquivos em ambos os diretórios (`backend` e `frontend`).

### Backend

1. Crie um arquivo `.env` no diretório `backend`:

   ```bash
   touch .env
   ```

2. Adicione as seguintes variáveis ao arquivo `.env`:

   ```env
   DATABASE_URL="postgresql://postgres.hapctzdvfbdyvqmerzbd:KFNqKAwKeRw5pcCQ@aws-0-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.hapctzdvfbdyvqmerzbd:KFNqKAwKeRw5pcCQ@aws-0-us-east-2.pooler.supabase.com:5432/postgres"
   PASSWORD=KFNqKAwKeRw5pcCQ
   JWT_SECRET="kmogvymkocfnjivgyiopvgsezcfretghnjuirbhtko7uyaqwlopsdubgtjfnjggedaiwjnuhrdgwjomnkqwsefgjvhakjsbfkah"
   ```

### Frontend

1. Crie um arquivo `.env` no diretório `frontend`:

   ```bash
   touch .env
   ```

2. Adicione as seguintes variáveis ao arquivo `.env`:

   ```env

   ```

# API URL

API_URL=http://localhost:3000

# JWT Secret

JWT_SECRET="kmogvymkocfnjivgyiopvgsezcfretghnjuirbhtko7uyaqwlopsdubgtjfnjggedaiwjnuhrdgwjomnkqwsefgjvhakjsbfkah"

PORT=3001

# Ambiente

NODE_ENV=development

````

## Executando o projeto

### Backend

1. Navegue até o diretório do backend:

```bash
cd desafiotecnico/backend
````

2. Execute o servidor:

   ```bash
   npm run start:dev
   ```

   ou, se você estiver usando o Yarn:

   ```bash
   yarn start:dev
   ```

### Frontend

1. Navegue até o diretório do frontend:

   ```bash
   cd ../frontend
   ```

2. Execute o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

   ou, se você estiver usando o Yarn:

   ```bash
   yarn dev
   ```

Agora você deve ser capaz de acessar o frontend em `http://localhost:3001` e o backend em `http://localhost:3000`.

Por conta do curto prazo de entrega, não fiz a integração entre front e back. Front esta funcionando com dados mockados, porem o backend ja esta pronto e populado, podendo ser acessado.

Acesse o swagger em: http://localhost:3000/api/docs#/
