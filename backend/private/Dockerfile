FROM node:18.19.1-bullseye

WORKDIR /app

COPY src /app/src

COPY server.js /app/
COPY package* /app/

RUN npm install

ENTRYPOINT [ "npm", "start" ]
