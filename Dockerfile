FROM hasura/graphql-engine:latest.cli-migrations as hasura

FROM ubuntu

# --no-install-recommends results in a smaller image, but we miss some CA cert
RUN apt-get update && apt-get install -y \
    ca-certificates \
    dumb-init \
    libpq5 \
    npm \
    && rm -rf /var/lib/apt/lists/*

COPY --from=hasura /bin/graphql-engine /usr/bin
COPY --from=hasura /bin/hasura-cli /usr/bin
COPY --from=hasura /bin/docker-entrypoint.sh /usr/bin

COPY . /app

WORKDIR /app/backend
RUN npm install

# migrations doesn't work yet
# ENTRYPOINT ["docker-entrypoint.sh"]

WORKDIR /app
CMD ./docker-run-backend-cmd.sh
