FROM node:20-bullseye-slim

RUN corepack enable
RUN corepack prepare pnpm@7.18.0 --activate

WORKDIR /app
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN pnpm install

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]