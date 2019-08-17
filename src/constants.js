const HASURA_GRAPHQL_ENGINE_HOSTNAME = '192.168.1.6:8080';

const scheme = proto => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto;
};

export const GRAPHQL_URL = `${scheme(
  'http'
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
export const REALTIME_GRAPHQL_URL = `${scheme(
  'ws'
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;
