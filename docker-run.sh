#! /bin/bash
IMAGE=hasura/graphql-engine
docker pull "$IMAGE"
docker run --network host \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://hasurauser:hasurauser@localhost/hasura \
       -e HASURA_GRAPHQL_JWT_SECRET \
       --name hasura \
       -d \
       "$IMAGE"
