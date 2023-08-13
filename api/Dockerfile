FROM node:18

WORKDIR /app

COPY ./api/package*.json ./

RUN npm install --loglevel verbose

COPY ./api/ .

RUN npm run build

CMD npm run start:dev
