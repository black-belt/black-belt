FROM node:16.13.1

COPY . .

RUN npm install --lagacy-peer-deps

RUN npm run build

CMD ["npm", "start"]
