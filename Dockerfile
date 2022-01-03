FROM node:15.4

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install @nestjs/cli
COPY . .

CMD npm run start:dev