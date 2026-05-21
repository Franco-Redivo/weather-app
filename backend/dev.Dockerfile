FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install && npx prisma generate

COPY . .

CMD ["npm", "run", "dev"]