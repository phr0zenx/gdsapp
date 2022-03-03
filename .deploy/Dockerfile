FROM node:current-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 80
CMD [ "node", "src/app.js" ]

