FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm i express mysql express-session path

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]