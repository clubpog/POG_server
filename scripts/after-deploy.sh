#!/bin/bash
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

rm -rf node_modules
npm ci
npm run build
pm2 kill
pm2 start dist/apps/api/src/main.js