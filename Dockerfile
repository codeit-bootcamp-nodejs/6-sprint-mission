FROM node:24.13.0
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . . 
RUN npx prisma generate
RUN npm run build
ENV SERVER_PORT=3000

# 컨테이너 실행 시 수행할 명령어: express 서버 실행
ENTRYPOINT ["sh", "./Dockerfile_entrypoint.sh"]