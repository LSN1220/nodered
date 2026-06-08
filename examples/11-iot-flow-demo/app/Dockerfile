FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY app ./app

EXPOSE 3020

CMD ["node", "app/src/app.js"]
