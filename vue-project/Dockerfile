FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json ./

RUN npm install

COPY jsconfig.json ./
COPY vite.config.js ./
COPY public public
COPY src src
COPY index.html ./

CMD npm run dev
