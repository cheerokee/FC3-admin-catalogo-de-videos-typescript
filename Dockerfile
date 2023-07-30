FROM node:14.15.4-slim

# usuário do container - root - futuramente
# echo $UID
#USER node - 1000
USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]
