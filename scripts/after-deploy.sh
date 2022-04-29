#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

rm -rf node_modules
rm package-lock.json
npm install --save --legacy-peer-deps
npm run build
pm2 start dist/apps/api/src/main.js --name "pog-push"