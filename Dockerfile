FROM node:8

WORKDIR /app
ADD package.json .
ADD yarn.lock .
RUN yarn