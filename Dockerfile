FROM node:20.1-alpine3.16 as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY package.json /app
COPY pnpm-lock.yaml /app

RUN pnpm install

COPY . .

RUN pnpm run build

CMD [ "node", "dist/index.js" ]