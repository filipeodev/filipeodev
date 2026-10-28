# Estágio 1: dependências
FROM node:22-slim AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Estágio 2: build
FROM node:22-slim AS builder

WORKDIR /app

# Variáveis NEXT_PUBLIC_* são embutidas no build. No Coolify, marque como "Build Variable".
ARG NEXT_PUBLIC_WHATSAPP=5511977206800
ARG NEXT_PUBLIC_SITE_URL=https://filipeodev.com
ENV NEXT_PUBLIC_WHATSAPP=$NEXT_PUBLIC_WHATSAPP
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Estágio 3: runtime
FROM node:22-slim

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Saída "standalone": só o que o servidor precisa, sem node_modules inteiro
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

USER node

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
