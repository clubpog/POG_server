#!/bin/bash
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

rm -rf node_modules
npm install
npm run build
pm2 start dist/apps/api/src/main.js --name "pog-push"