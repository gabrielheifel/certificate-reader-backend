FROM node:latest 

WORKDIR /user/src/api

COPY . .
COPY package*.json ./

RUN npm install --quiet --no-optional --no-found --loglever=error

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]