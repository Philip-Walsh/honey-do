FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .
RUN mkdir -p /app/build && chmod -R 777 /app/build
RUN npm run build

FROM cgr.dev/chainguard/node:latest

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm install --omit=dev

EXPOSE 3001

CMD ["dist/server.js"]
