# ------------------------------------------------------------------------------------
# 1. Build Stage (빌드 단계)
# - 목적: 소스 코드를 빌드하고 실행 가능한 파일(dist)을 만드는 '공장' 역할
# - 베이스 이미지: node:${NODE_VERSION} (Full 버전)
#   -> python3, gcc, make, openssl 등 빌드 도구가 모두 포함된 무거운 이미지 (약 1GB)
# ------------------------------------------------------------------------------------
ARG NODE_VERSION=24.13.0
FROM node:${NODE_VERSION} AS build-stage
WORKDIR /app
# 패키지 정보만 먼저 복사 (캐시 활용을 위해)
COPY package*.json ./

# 모든 의존성 설치 (devDependencies 포함 -> 빌드용)
RUN npm ci

# 소스 코드 및 설정 파일 복사
COPY . .

# Prisma 클라이언트 생성 (타입 등 생성)
RUN npx prisma generate

# TypeScript 빌드 (dist 폴더 생성)
RUN npm run build


# ------------------------------------------------------------------------------------
# 2. Production Stage (실행 단계)
# - 목적: 실제로 서비스를 실행할 가볍고 최적화된 이미지 생성
# - 베이스 이미지: node:${NODE_VERSION}-slim (Slim 버전)
#   -> node.js 실행에 필요한 최소한의 파일만 남기고 다 뺀 이미지 (약 200MB)
#   -> 주의: openssl 같은 라이브러리도 빠져있어서 수동 설치 필요함!
# ------------------------------------------------------------------------------------
FROM node:${NODE_VERSION}-slim
WORKDIR /app

# OpenSSL 설치 (Prisma Client 실행에 필요)
# -> slim 이미지에는 openssl이 없어서 Prisma Query Engine이 실행되지 않으므로 필수 설치
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# 환경 변수 설정 (기본값)
ENV SERVER_PORT=3000
# 빌드 스테이지에서 생성된 'dist' 폴더만 복사
COPY --from=build-stage /app/dist ./dist
# 패키지 정보 복사
COPY --from=build-stage /app/package*.json ./
# Prisma 스키마 복사
COPY --from=build-stage /app/prisma ./prisma

# 프로덕션 의존성만 설치 (가볍게)
# --omit=dev: devDependencies 제외 (typescript, eslint 등은 실행에 필요 없으므로 제거)
RUN npm ci --omit=dev

# Prisma 클라이언트 다시 생성 (운영 환경 런타임에 맞춰 최적화)
RUN npx prisma generate

# 서버 실행
CMD ["npm", "run", "start"]