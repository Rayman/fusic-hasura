const HASURA_ORIGIN = process.env.REACT_APP_HASURA_ORIGIN;
console.assert(HASURA_ORIGIN, 'REACT_APP_HASURA_ORIGIN not set');

const graphql_url = new URL(HASURA_ORIGIN);
graphql_url.pathname = '/v1/graphql';
export const GRAPHQL_URL = graphql_url.href;

graphql_url.protocol = correspondingWsProtocol(graphql_url.protocol);
export const REALTIME_GRAPHQL_URL = graphql_url;

/**
 * Auth0
 */
export const auth0ClientId = 'O2vvZXmJUBX5PdxYdx34a3pJxc7ZSEF2';
export const auth0Domain = 'fusic.eu.auth0.com';

function correspondingWsProtocol(protocol) {
  switch (graphql_url.protocol) {
    case 'https:':
      return 'wss:';
    case 'http:':
      return 'ws:';
    default:
      throw new Error(
        `REACT_APP_HASURA_ORIGIN has unknown protocol ${protocol}`
      );
  }
}
