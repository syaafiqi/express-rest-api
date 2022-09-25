FROM node:14-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

CMD ["node", "server.js"]

EXPOSE 3030
