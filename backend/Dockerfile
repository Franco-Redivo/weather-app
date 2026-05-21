FROM node:24 AS builder

WORKDIR /usr/src/app

# Install full deps (including dev) to run prisma generate
COPY package*.json ./
RUN npm ci

# Copy source and generate Prisma client
COPY . .
RUN npx prisma generate

FROM node:24 AS final

WORKDIR /usr/src/app

# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy Prisma generated artifacts from builder
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Copy app source
COPY --from=builder /usr/src/app .

USER node

CMD ["npm", "start"]