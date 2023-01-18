FROM node:alpine

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

ENV MONGO_CONNECTION_URI=mongodb://mongodb:27017/universities

CMD ["node", "dist/app"]