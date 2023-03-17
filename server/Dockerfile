FROM node:13-alpine

WORKDIR /home/carson/App-Projects/workout-app/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]