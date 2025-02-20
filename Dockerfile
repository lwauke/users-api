FROM node:22-alpine

WORKDIR /opt/dev

COPY package.json bin mocks routes app.js ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]