#!/bin/bash
REPOSITORY=/home/ubuntu/build
cd $REPOSITORY

rm -rf node_modules

sudo n 12
sudo npm ci

sudo n 16
sudo npm i graphql
sudo rimraf dist
sudo npm run build:push
sudo npm run build:api

sudo pm2 restart pog-api
sudo pm2 restart pog-push