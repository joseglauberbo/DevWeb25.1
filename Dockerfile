# Usa uma imagem base do Node.js com suporte a TypeScript
FROM node:18

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código-fonte para o contêiner
COPY . .

# Compila o TypeScript para JavaScript
RUN npm run build

# Expõe a porta que o servidor Express vai usar
EXPOSE 3000

# Comando para rodar o servidor
CMD ["npm", "start"]