# Dockerfile
# Imagem base
FROM node:20-alpine

# Define o diretório de trabalho no container
WORKDIR /usr/src/app

# Copia package.json e package-lock.json e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código fonte
COPY . .

# Expõe a porta que o Express está ouvindo
EXPOSE 3000

# Comando para iniciar o servidor
CMD [ "npm", "run", "dev" ]