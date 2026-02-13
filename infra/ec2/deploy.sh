#!/bin/bash
set -e

cd "$(dirname "$0")/../.."

git pull
npm ci --omit=dev
npx prisma migrate deploy
pm2 reload infra/ec2/ecosystem.config.js