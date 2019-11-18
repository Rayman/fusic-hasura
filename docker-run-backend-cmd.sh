#!/usr/bin/dumb-init /bin/sh

PORT=${PORT:-8080}
echo "hosting graphql on port $PORT"

BACKEND_PORT="$((PORT+1))"

PORT="$BACKEND_PORT" npm --prefix backend start & # un in the background
sleep 3
FUSIC_BACKEND_URL="http://localhost:$BACKEND_PORT" graphql-engine \
  --database-url ${DATABASE_URL?"env DATABASE_URL missing"} \
  serve \
  --unauthorized-role anonymous \
  --server-port "$PORT"

