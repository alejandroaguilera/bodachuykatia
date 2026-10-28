FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
# CLI de Prisma con todas sus dependencias, aparte del bundle standalone, solo para migrar al arrancar
RUN mkdir /prisma-cli && cd /prisma-cli && npm init -y >/dev/null && npm i --omit=dev prisma@6.19.3 >/dev/null
EXPOSE 3000
CMD ["sh", "-c", "/prisma-cli/node_modules/.bin/prisma migrate deploy --schema prisma/schema.prisma && node server.js"]
