# --- Etapa 1: Build (Construção) ---
# Usamos uma imagem oficial do Node.js como base para construir o projeto.
# A tag "-alpine" se refere a uma versão mínima, o que acelera o download.
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do contêiner.
WORKDIR /app

# Copia os arquivos de definição de dependências.
COPY package*.json ./

# Instala as dependências do projeto.
RUN npm install

# Copia todo o resto do código-fonte para o contêiner.
COPY . .

# Define o argumento para o base path, com /form como padrão.
ARG VITE_BASE_PATH=/form
ENV VITE_BASE_PATH=$VITE_BASE_PATH

# Executa o script de build para gerar os arquivos de produção.
RUN npm run build

# --- Etapa 2: Serve (Servidor) ---
# Usamos uma imagem oficial do Nginx para servir os arquivos estáticos.
# É super leve e otimizada para isso.
FROM nginx:stable-alpine

# Remove a configuração padrão do Nginx.
RUN rm /etc/nginx/conf.d/default.conf

# Copia nossa configuração personalizada do Nginx para o contêiner.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos gerados na etapa de build para a pasta que o Nginx usa.
# Note que copiamos para um subdiretório /form para corresponder ao nosso base path.
COPY --from=builder /app/dist /usr/share/nginx/html/form

# Expõe a porta 80 para que o contêiner possa receber tráfego.
EXPOSE 80

# Comando para iniciar o servidor Nginx quando o contêiner for executado.
CMD ["nginx", "-g", "daemon off;"]