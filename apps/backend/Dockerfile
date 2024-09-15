FROM node:20-alpine

WORKDIR /app/apps/backend

COPY . .

RUN yarn install

CMD ["yarn", "start:dev"]
