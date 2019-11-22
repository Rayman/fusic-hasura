#!/bin/sh
set -e

PORT=${PORT:-8080}
HASURA_PORT="$((PORT+1))"
BACKEND_PORT="$((PORT+2))"

echo "hosting nginx on port $PORT"
PORT="$PORT" HASURA_PORT="$HASURA_PORT" envsubst '$PORT $HASURA_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
nginx  # run in the background

echo "hosting backend on port $BACKEND_PORT"
PORT="$BACKEND_PORT" npm --prefix backend start & # un in the background

sleep 3

echo "hosting graphql on port $HASURA_PORT"
FUSIC_BACKEND_URL="http://localhost:$BACKEND_PORT" graphql-engine \
  --database-url "${DATABASE_URL?"env DATABASE_URL missing"}" \
  serve \
  --unauthorized-role anonymous \
  --server-port "$HASURA_PORT"
