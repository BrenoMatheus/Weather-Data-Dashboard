## GDASH Challenge — Weather Intelligence System

Full-Stack Pipeline: Python → Message Broker → Go → NestJS → MongoDB → React

## Status da Implementação Atual


| Módulo                                             | Status                   | Descrição                                                       |
| -------------------------------------------------- | ------------------------ | --------------------------------------------------------------- |
| **Frontend (React + Vite + Tailwind + shadcn/ui)** | ✅ Em funcionamento       | Dashboard inicial, login, rotas protegidas, exportação CSV/XLSX |
| **Autenticação JWT (frontend e backend)**          | ✅ Implementado           | Login, register, armazenamento de token e proteção de rotas     |
| **Backend NestJS (API + MongoDB)**                 | ✅ Em funcionamento       | CRUD de clima, exportação de dados, login/register              |
| **Exportação CSV/XLSX**                            | ✅ Implementado           | Front integrado aos endpoints                                   |
| **Dashboard de Clima (frontend)**                  | ✅ Em funcionamento         | Exibição de métricas básicas + botões de export                 |
| **Pipeline Python → Fila → Go → NestJS**           | ✅ Em funcionamento | (A ser desenvolvido)                                            |
| **Insights de IA**                                 | ❌ Pendente               | Buscando IA grátis                                            |
| **Página opcional de API pública paginada**        | ❌ A ser adicionada       | (PokéAPI ou SWAPI)                                              |
| **Docker Compose para todos os serviços**          | ✅ Em funcionamento  | já desenvolvido                                              |

## O que já foi entregue (completo)

### Backend — NestJS + MongoDB

### APIs implementadas até agora:

* Modelo salvo corretamente com:
  * temperatura
  * velocidade do vento
  * raw data
  * timestamp automático

### Configurações implementadas
* Integração com MongoDB
* Middlewares de autenticação
* Guards para proteger rotas privadas

### Serviço Python — Coletor Climático
* Coleta periódica via Open-Meteo/OpenWeather
* Normalização dos dados
* Envio para RabbitMQ
* Logs estruturados

### Fila + Worker Go
* Consumo de mensagens
* Transformação dos dados
* Envio para NestJS
* Retry com backoff
* Logging + DLQ

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

## Tabela de Rotas da Aplicação

| Rota / Endpoint             | Método | Serviço   | Autenticação | Descrição |
|-----------------------------|--------|-----------|--------------|-----------|
| /auth/register              | POST   | Backend   | ❌ Não        | Cria um novo usuário. |
| /auth/login                 | POST   | Backend   | ❌ Não        | Autentica e retorna JWT. |
| /weather                    | GET    | Backend   | ✅ Sim       | Lista todos os registros de clima. |
| /weather/export/csv         | GET    | Backend   | ✅ Sim       | Exporta os dados em CSV. |
| /weather/export/xlsx        | GET    | Backend   | ✅ Sim       | Exporta os dados em XLSX. |
| /weather/logs               | POST   | Backend   | 🔒 Interna   | Usada pelo worker Go para salvar logs. |
| /login                      | GET    | Frontend  | ❌ Não        | Tela de login. |
| /register                   | GET    | Frontend  | ❌ Não        | Tela de registro. |
| /                          | GET    | Frontend  | ✅ Sim       | Dashboard com dados de clima. |
| /users (futuro)             | GET    | Frontend  | ✅ Sim       | Listagem de usuários. |
| (Python collector)          | -      | Python    | N/A          | Coleta clima e envia para a fila. |
| (Go worker)                 | -      | Go        | N/A          | Processa fila e envia para NestJS. |


## Estrutura do Projeto (até o momento)

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

/api
  /src
    /auth
    /weather
    /users
  app.module.ts
  main.ts

/producer-python
  Dockerfile
  requirements.txt
  main.ts

/worker-go
  Dockerfile
  main.go

docker-compose.yml

```
## Como Rodar o Projeto

### Rodando com Docker
* Pré-requisitos
* Docker instalado → https://www.docker.com/

### Como Rodar o Projeto (Frontend + Backend)

```bash
docker-compose up -d --build
```