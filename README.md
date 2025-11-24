## GDASH Challenge — Weather Intelligence System

Full-Stack Pipeline: Python → Message Broker → Go → NestJS → MongoDB → React

## Status da Implementação Atual


| Módulo                                             | Status                   | Descrição                                                       |
| -------------------------------------------------- | ------------------------ | --------------------------------------------------------------- |
| **Frontend (React + Vite + Tailwind + shadcn/ui)** | ✅ Em funcionamento       | Dashboard inicial, login, rotas protegidas, exportação CSV/XLSX |
| **Autenticação JWT (frontend e backend)**          | ✅ Implementado           | Login, register, armazenamento de token e proteção de rotas     |
| **Backend NestJS (API + MongoDB)**                 | ✅ Em funcionamento       | CRUD de clima, exportação de dados, login/register              |
| **Exportação CSV/XLSX**                            | ✅ Implementado           | Front integrado aos endpoints                                   |
| **Dashboard de Clima (frontend)**                  | ⚠️ Em progresso          | Exibição de métricas básicas + botões de export                 |
| **Pipeline Python → Fila → Go → NestJS**           | ❌ Ainda não implementado | (A ser desenvolvido)                                            |
| **Insights de IA**                                 | ❌ Pendente               | (A ser desenvolvido)                                            |
| **Página opcional de API pública paginada**        | ❌ A ser adicionada       | (PokéAPI ou SWAPI)                                              |
| **Docker Compose para todos os serviços**          | ❌ Ainda não configurado  | (A ser finalizado)                                              |


## O que já foi entregue (completo)

### Backend — NestJS + MongoDB

### APIs implementadas até agora:
* POST /auth/login — login com JWT
* POST /auth/register — criação de usuário
* GET /weather — listagem dos registros
* GET /weather/export/csv — exportação CSV
* GET /weather/export/xlsx — exportação XLSX

* Modelo salvo corretamente com:
  -  temperatura
  -  velocidade do vento
  -  raw data
  -  timestamp automático

### Configurações implementadas
- Integração com MongoDB
- Middlewares de autenticação
- Guards para proteger rotas privadas

### Frontend — React + Vite + Tailwind + shadcn/ui

### Autenticação
* Tela de login
* Tela de registro
* Token salvo no localStorage
* Axios/fetch com Bearer Token
* Rotas privadas usando wrappers

### Dashboard inicial
* Botões de exportação CSV e XLSX funcionando
* Requisições autenticadas ao backend
* Exibição básica dos dados vindos da API

### Estrutura ok
* React Router configurado
* API Base extraída via .env (VITE_API_BASE)
* Layout inicial pronto

### Estrutura do Projeto (até o momento)

```bash

/frontend
  /src
    /api
      weatherApi.ts
      authApi.ts
    /components
      WeatherExportButtons.tsx
      ProtectedRoute.tsx
    /pages
      Login.tsx
      Register.tsx
      Home.tsx
    main.tsx
    App.tsx

/backend
  /src
    /auth
    /weather
    /users
  app.module.ts
  main.ts

docker-compose.yml

```
## Como Rodar o Projeto

### Rodando com Docker
* Pré-requisitos
* Docker instalado → https://www.docker.com/

### Rodando sem Docker (Modo Desenvolvimento)
* Pré-requisitos
* Node.js 18+
* NPM ou Yarn
* PostgreSQL instalado localmente

### Como Rodar o Projeto (Frontend + Backend)

```bash
docker-compose up -d --build
```