FROM node:16-alpine

RUN apk update \
    && apk --no-cache add build-base git python3 py3-pip grpc-dev openssl-dev curl libtool cmake make

WORKDIR /usr/src/app
RUN git clone https://github.com/juanAngel/lightning-box.git --branch lnd-grpc ./

RUN npm install
RUN npm run build


CMD ["node", "dist/src/server.js"]