# Imagem base oficial do Python
FROM python:3.11-slim

# Evita criação de arquivos .pyc e acelera o container
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Cria diretório da aplicação
WORKDIR /app

# Copia requirements primeiro (melhor para cache)
COPY requirements.txt .

# Instala dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o resto da aplicação
COPY . .

# Porta do FastAPI ou serviço Python
EXPOSE 8000

# Comando para iniciar o producer
CMD ["python", "main.py"]
