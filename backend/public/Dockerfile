FROM node:18.19.1-bullseye-slim

WORKDIR /app

COPY src /app/src

COPY server.js /app/
COPY package* /app/

RUN npm install
RUN npm cache clean --force

ENTRYPOINT [ "npm", "start" ]
