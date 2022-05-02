#!/bin/bash
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

rm -rf node_modules

sudo n 12
sudo npm ci
sudo npm run build

sudo n 16
sudo pm2 restart pog-api