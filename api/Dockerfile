FROM node:18

WORKDIR /app

COPY ./api/package*.json ./

RUN npm install --loglevel verbose

COPY ./api/.eslintrc.js .
COPY ./api/nest-cli.json .
COPY ./api/tsconfig.build.json .
COPY ./api/tsconfig.json .

RUN npm run build

CMD npm run start:dev
