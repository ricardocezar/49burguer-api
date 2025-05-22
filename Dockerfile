FROM node:18-slim

WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copiar tudo primeiro
COPY . .

# Instalar dependências
RUN npm ci

RUN npm install -g ts-node typescript

# Configurar Prisma
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# Tentar diferentes abordagens para gerar o cliente Prisma
RUN npx prisma generate || \
    (npm install @prisma/engines && npx prisma generate) || \
    (PRISMA_ENGINES_MIRROR=direct npx prisma generate)

# Build da aplicação
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
