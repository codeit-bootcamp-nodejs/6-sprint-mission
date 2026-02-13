#!/bin/bash
set -e

cd "$(dirname "$0")/../.."

npm ci --omit=dev
npx prisma generate
npx prisma migrate deploy
npm run build

pm2 delete all || true
pm2 start infra/ec2/ecosystem.config.js
pm2 save
pm2 startup || true