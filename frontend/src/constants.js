const HASURA_HOSTNAME = process.env.REACT_APP_HASURA_HOSTNAME;
console.assert(HASURA_HOSTNAME, "REACT_APP_HASURA_HOSTNAME not set");

const scheme = proto => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto;
};

export const GRAPHQL_URL = `${scheme(
  'http'
)}://${HASURA_HOSTNAME}/v1/graphql`;
export const REALTIME_GRAPHQL_URL = `${scheme(
  'ws'
)}://${HASURA_HOSTNAME}/v1/graphql`;
