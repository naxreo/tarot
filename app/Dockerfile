# Next.js standalone 산출물을 사내 nexus 레지스트리용 amd64 이미지로 빌드하는 멀티스테이지 Dockerfile
# 빌드 명령. docker build --platform linux/amd64 -t nexus.onkakao.net/kakao-plat-docker-hosted/tarot:<TAG> .

# 1) deps. lockfile 기반 의존성만 설치
FROM nexus.onkakao.net/docker-proxy-group/library/node:22.23.4-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2) builder. 소스 빌드 + standalone 산출물
FROM nexus.onkakao.net/docker-proxy-group/library/node:22.23.4-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3) runner. standalone + static + public 만 포함한 슬림 런타임
FROM nexus.onkakao.net/docker-proxy-group/library/node:22.23.4-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 비루트 실행
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# Next.js standalone 산출물
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
