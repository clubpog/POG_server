#!/bin/bash
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

rm -rf node_modules
sudo npm install
sudo npm run build
sudo pm2 start dist/apps/api/src/main.js --name "pog-push"