FROM node:18.19.1-bullseye

WORKDIR /app

COPY src /app/src
COPY public /app/public
COPY package* /app/
COPY tailwind.config.js /app/

RUN npm install

ENTRYPOINT [ "npm", "start" ]
