npm ci
npx prisma generate
npx prisma migrate deploy
npm run build

pm2 reload infra/ec2/ecosystem.config.js