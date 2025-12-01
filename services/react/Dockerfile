FROM cgr.dev/chainguard/node:latest as build

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm ci

COPY . .

# Fix for EACCES: permission denied, open '/app/node_modules/.cache/.eslintcache'
ENV DISABLE_ESLINT_PLUGIN=true

RUN npm run build

FROM cgr.dev/chainguard/nginx:latest

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["-g", "daemon off;"]
