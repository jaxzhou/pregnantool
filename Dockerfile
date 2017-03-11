FROM node:7
RUN curl -L https://npmjs.org/install.sh | sh
WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app

CMD []
ENTRYPOINT ["/nodejs/bin/npm", "start"]