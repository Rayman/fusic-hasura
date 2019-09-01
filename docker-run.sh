#! /bin/bash
IMAGE=hasura/graphql-engine
docker pull "$IMAGE"
docker run --network host \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://hasurauser:hasurauser@localhost/hasura \
       -e FUSIC_BACKEND_URL \
       -e FUSIC_YOUTUBE_KEY \
       --name hasura \
       -d \
       "$IMAGE"
