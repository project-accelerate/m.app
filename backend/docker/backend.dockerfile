FROM node:10

WORKDIR /app
ADD package.json .
ADD backend/package.json backend/package.json
ADD common/package.json common/package.json
ADD frontend/common/package.json frontend/common/package.json
ADD frontend/web/package.json frontend/web/package.json
ADD yarn.lock .
ADD tasks ./tasks
RUN yarn
ADD . .
RUN yarn heroku-postbuild
