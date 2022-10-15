FROM node:16.18-alpine3.15
MAINTAINER Jiawei
ENV PYTHONUNBUFFERED=1


# canvas的依赖包安装
RUN apk add --update --no-cache \
    make \
    g++ \
    jpeg-dev \
    cairo-dev \
    giflib-dev \
    pango-dev \
    libtool \
    autoconf \
    automake

COPY . /app

WORKDIR /app

RUN npm install nodemon -g
RUN npm install -g node-gyp
RUN yarn install


EXPOSE 3030

CMD ["npm", "start"]

