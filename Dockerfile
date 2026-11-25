FROM node:26-alpine
LABEL org.opencontainers.image.source=https://github.com/joscalbel/NodePeliculas

RUN npm install -g pnpm
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY . .

USER node
EXPOSE 3000
CMD ["node", "src/app.js"]