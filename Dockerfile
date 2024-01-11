# Usa a versão LTS mais recente do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY app/package*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos da aplicação
COPY . .

# Expõe a porta que a aplicação utiliza
EXPOSE 3000

# Define um comando condicional para iniciar a aplicação
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = 'development' ]; then npm run dev; else npm start; fi"]
