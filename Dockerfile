FROM hasura/graphql-engine:latest.cli-migrations as hasura

# build the frontend assets
FROM node:slim as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

# build the backend
FROM node:slim as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# finally, assemble the app
FROM ubuntu

# --no-install-recommends results in a smaller image, but we miss some CA cert
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y \
    ca-certificates \
    dumb-init \
    libpq5 \
    npm \
    && rm -rf /var/lib/apt/lists/*

COPY --from=hasura /bin/graphql-engine /usr/bin/
COPY --from=hasura /bin/hasura-cli /usr/bin/
COPY --from=hasura /bin/docker-entrypoint.sh /usr/bin/

COPY --from=frontend /app/frontend/build /app/frontend/
COPY --from=backend /app/backend /app/backend/

# migrations doesn't work yet
# ENTRYPOINT ["docker-entrypoint.sh"]

WORKDIR /app
COPY docker-run-backend-cmd.sh ./
CMD ./docker-run-backend-cmd.sh
