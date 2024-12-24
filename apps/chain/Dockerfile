FROM node:20-alpine

WORKDIR /app/apps/chain

COPY . .

RUN apk add --update python3 make g++
RUN yarn install

CMD ["yarn", "dev"]
