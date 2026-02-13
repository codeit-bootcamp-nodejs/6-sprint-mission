FROM node:24.13.0
WORKDIR /app
COPY . . 
RUN npm ci --omit=dev
RUN npx prisma generate
ENV SERVER_PORT=3000
# 컨테이너 실행 시 수행할 명령어: express 서버 실행'
ENTRYPOINT ["npm", "run", "start"]