FROM node:lts as builder

WORKDIR /app

ARG NUXT_REP_API_KEY
ARG NUXT_STRAPI_TOKEN
ARG NUXT_STRAPI_BASE
ARG NUXT_PUBLIC_BASE_URL


COPY . .

RUN npm install
RUN npm run build


FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

ENV HOST 0.0.0.0
EXPOSE 3000

CMD [ "node", ".output/server/index.mjs" ]