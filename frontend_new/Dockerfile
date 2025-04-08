# Estágio de build
FROM --platform=$BUILDPLATFORM node:23.6.1-bullseye-slim AS build-stage

# Define argumentos que podem ser passados durante o build
ARG REACT_APP_API_URL
ARG NODE_ENV=production

# Torna os argumentos disponíveis como variáveis de ambiente durante o build
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV NODE_ENV=$NODE_ENV

WORKDIR /app

COPY src /app/src
COPY public /app/public
COPY package* /app/
COPY tailwind.config.js /app/

RUN npm install -g npm
RUN npm install
RUN npm run build

# Estágio de produção com Nginx
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
# A configuração do Nginx será fornecida via volume no docker