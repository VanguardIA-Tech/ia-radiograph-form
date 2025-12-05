# Multi-stage build for Vite React app
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package.json package-lock.json* pnpm-lock.yaml* bun.lockb* ./
RUN if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f bun.lockb ]; then npm install -g bun && bun install; \
    else npm install; fi

# Copy source
COPY . .

# Build (Vite) - expects VITE_* env vars (e.g., VITE_CLARITY_ID) provided at build time
RUN npm run build

# Stage 2: Serve static files with nginx
FROM nginx:1.27-alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built assets
COPY --from=builder /app/dist .

# Minimal nginx config
COPY <<'EOF' /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        access_log off;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
