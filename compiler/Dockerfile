FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache g++ python3 py3-pip openjdk11
RUN npm install
COPY . .
EXPOSE 5001
CMD node compiler.js
