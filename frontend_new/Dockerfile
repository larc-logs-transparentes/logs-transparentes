FROM --platform=$BUILDPLATFORM node:23.6.1-bullseye-slim AS build-stage

WORKDIR /app

COPY src /app/src
COPY public /app/public
COPY package* /app/
COPY tailwind.config.js /app/

RUN npm install -g npm
RUN npm install
RUN npm run build


FROM nginx:1.27-bookworm

COPY --from=build-stage /app/build /usr/share/nginx/html
