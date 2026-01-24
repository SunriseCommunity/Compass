FROM oven/bun:1.3-alpine AS base
ENV FORCE_COLOR=0
WORKDIR /app

FROM base AS prod
WORKDIR /app
COPY . /app
RUN bun install --frozen-lockfile
RUN bun run build

FROM nginxinc/nginx-unprivileged:alpine AS serve
USER nginx
RUN rm -f /etc/nginx/conf.d/default.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=prod /app/dist /usr/share/nginx/html
EXPOSE 8080