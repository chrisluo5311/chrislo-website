#!/usr/bin/env bash
set -euo pipefail

# --- Node 環境（nvm） ---
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"

echo "[deploy] starting deployment process"

# --- 專案路徑（改成你的實際路徑） ---
APP_DIR="/home/ec2-user/mywebsite"
cd "$APP_DIR"

# --- 安裝依賴：有 lock 就 npm ci，沒有就 npm install ---
echo "[deploy] installing dependencies"
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

# --- 建置（Vue 產生 dist/）---
echo "[deploy] building application"
npm run build

# --- 用 pm2 跑 Prod（ecosystem.config.js 裡的 chrislo-web）---
echo "[deploy] starting/reloading application via pm2"
# 第一次沒在跑 -> start；之後 -> reload
if pm2 describe chrislo-web >/dev/null 2>&1; then
  pm2 reload ecosystem.config.js --only chrislo-web --env production
else
  pm2 start ecosystem.config.js  --only chrislo-web --env production
fi

pm2 save
echo "[deploy] deployment process completed"
