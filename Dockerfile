  FROM node:7.5.0

  WORKDIR /app
  ADD package.json /app/
  RUN npm install
  ADD . /app

  CMD []
  ENTRYPOINT ["/nodejs/bin/npm", "start"]