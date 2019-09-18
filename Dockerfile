FROM hasura/graphql-engine as hasura

FROM ubuntu

# --no-install-recommends results in a smaller image, but we miss some CA cert
RUN apt-get update && apt-get install -y \
    libpq5 \
    npm \
    && rm -rf /var/lib/apt/lists/*

COPY --from=hasura /bin/graphql-engine /usr/bin
COPY . /app

WORKDIR /app/backend
RUN npm install

CMD npm start
