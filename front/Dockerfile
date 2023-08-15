FROM node:18

WORKDIR /app

ENV NODE_ENV=development
ENV NODE_PATH=/app/node_modules
# RUN npm config set unsafe-perm true

RUN npm i -g typescript tsc-watch nodemon webpack webpack-cli --loglevel verbose

COPY ./front/package*.json ./

RUN npm install --loglevel verbose

COPY /front/webpack.config.cjs /app/
COPY /front/tsconfig.json /app/

#COPY ./front/ .

CMD webpack serve 
