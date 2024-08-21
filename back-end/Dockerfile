FROM node:18.16.1-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update -y && apt-get install -y openssl


RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && node app.js"]
