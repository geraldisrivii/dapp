FROM node:20-alpine

WORKDIR /app/apps/backend

COPY . .

RUN apk add --update python3 make g++
RUN yarn install

CMD ["yarn", "start:dev"]
