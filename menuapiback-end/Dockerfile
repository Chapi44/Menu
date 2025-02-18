# ---- Build Stage ----
FROM node:20-alpine AS builder

ENV NODE_ENV=staging

WORKDIR /usr/src/app
RUN apk update && apk add --no-cache openssl
COPY package*.json ./

RUN npm install
# RUN yarn install cache-manager

COPY . .

RUN npx prisma generate

RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS production

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache openssl

# Copy only the necessary files from the build stage
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/prisma ./prisma

CMD ["npm", "run", "migrat:start:prod"]
