# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copia apenas pacotes para melhor cache
COPY package*.json ./

RUN npm install

# Copia o restante do projeto
COPY . .

# Compila o NestJS
RUN npm run build


# -------------------------
# Runtime stage
# -------------------------
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Instala apenas dependências de produção
RUN npm install --only=production

# Copia o build gerado
COPY --from=builder /app/dist ./dist

# Copia o .env se quiser dentro da imagem (opcional)
# COPY .env .env

EXPOSE 3000

CMD ["node", "dist/main.js"]
