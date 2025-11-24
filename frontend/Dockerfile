# Build da aplicação
FROM node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


# Servidor estático com nginx
FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
