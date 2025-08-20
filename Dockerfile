# Stage 1: Base image.
## Start with a base image containing Bun.
FROM oven/bun:1.2-alpine AS base
## Disable colour output from bun to make logs easier to read.
ENV FORCE_COLOR=0
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus

# Stage 2a: Development mode.
FROM base AS dev
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## Expose the port that Docusaurus will run on.
EXPOSE 3000
## Run the development server.
CMD [ -d "node_modules" ] && bun start --host 0.0.0.0 --poll 1000 || bun install && bun start --host 0.0.0.0 --poll 1000

# Stage 2b: Production build mode.
FROM base AS prod
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## Copy over the source code.
COPY . /opt/docusaurus/
## Install dependencies with `--frozen-lockfile` to ensure reproducibility.
RUN bun install --frozen-lockfile
## Build the static site.
RUN bun run build

# Stage 3a: Serve with `docusaurus serve`.
FROM prod AS serve
## Expose the port that Docusaurus will run on.
EXPOSE 3000
## Run the production server.
CMD ["bun", "serve", "--host", "0.0.0.0", "--no-open"]