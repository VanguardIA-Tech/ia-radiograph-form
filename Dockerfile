# ============================================
# Stage 1: Build
# ============================================
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Copiar arquivos de dependências
COPY package.json pnpm-lock.yaml ./

# Instalar dependências com pnpm
RUN pnpm install --frozen-lockfile

# Copiar código-fonte
COPY . .

# Build args - variáveis de ambiente do EasyPanel
ARG VITE_CLARITY_ID="tybowyyue1"

# Definir variáveis de ambiente para o build
ENV VITE_CLARITY_ID=${VITE_CLARITY_ID}

# Executar build
RUN pnpm run build

# Verificar se o build foi bem-sucedido
RUN test -d /app/dist && test -f /app/dist/index.html || (echo "❌ ERROR: Build failed!" && exit 1)

# ============================================
# Stage 2: Serve (Nginx)
# ============================================
FROM nginx:alpine

# Instalar curl para healthcheck HTTP
RUN apk add --no-cache curl

# Remover config padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar arquivos estáticos do build anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Verificar se os arquivos foram copiados
RUN test -f /usr/share/nginx/html/index.html || (echo "❌ ERROR: Files not copied!" && exit 1)

# Expor porta
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Comando de inicialização
CMD ["nginx", "-g", "daemon off;"]

