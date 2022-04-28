#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

rm -rf node_modules
npm ci
npm run build
pm2 kill
pm2 start dist/apps/api/src/main.js