#!/bin/bash

npm install

echo "###### Building @core ######"
npm run build -w @fc/micro-videos

tail -f /dev/null

#npm run start:dev
