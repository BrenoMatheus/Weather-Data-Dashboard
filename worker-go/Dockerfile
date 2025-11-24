# ------------------------------------------------------
# 1) Build stage — compila o código Go
# ------------------------------------------------------
FROM golang:1.22-alpine AS builder

# Instala dependências úteis
RUN apk add --no-cache git

WORKDIR /app

# Copia os arquivos go.mod e go.sum primeiro (cache build)
COPY go.mod go.sum ./

RUN go mod download

# Copia o restante do código
COPY . .

# Compila o binário
RUN go build -o worker main.go


# ------------------------------------------------------
# 2) Final stage — imagem minimal
# ------------------------------------------------------
FROM alpine:3.19

WORKDIR /app

# Copia apenas o binário
COPY --from=builder /app/worker .

# Permite execução
RUN chmod +x /app/worker

# Comando final
CMD ["./worker"]
