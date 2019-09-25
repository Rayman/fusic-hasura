const HASURA_HOSTNAME = process.env.REACT_APP_HASURA_HOSTNAME;
console.assert(HASURA_HOSTNAME, 'REACT_APP_HASURA_HOSTNAME not set');

const scheme = proto => {
  return window.location.protocol === 'https:' ? `${proto}s` : proto;
};

export const GRAPHQL_URL = `${scheme('http')}://${HASURA_HOSTNAME}/v1/graphql`;
export const REALTIME_GRAPHQL_URL = `${scheme(
  'ws'
)}://${HASURA_HOSTNAME}/v1/graphql`;

/**
 * Auth0
 */
export const auth0ClientId = 'O2vvZXmJUBX5PdxYdx34a3pJxc7ZSEF2';
export const auth0Domain = 'fusic.eu.auth0.com';
export const auth0CallbackUrl = `${scheme(
  'http'
)}://${HASURA_HOSTNAME}/callback`;
