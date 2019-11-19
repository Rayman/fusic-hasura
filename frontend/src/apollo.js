import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import { GRAPHQL_URL, REALTIME_GRAPHQL_URL } from './constants';

const getHeaders = tokenRef => {
  const headers = {};
  if (tokenRef.current) {
    headers.authorization = `Bearer ${tokenRef.current}`;
  }
  return headers;
};

const makeApolloClient = tokenRef => {
  console.log('makeApolloClient');

  // Create an http link:
  let httpLink = new HttpLink({
    uri: GRAPHQL_URL,
    fetch,
  });
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({ headers: getHeaders(tokenRef) });
    return forward(operation);
  });
  httpLink = middlewareLink.concat(httpLink);

  const wsLink = new WebSocketLink(
    new SubscriptionClient(REALTIME_GRAPHQL_URL, {
      reconnect: true,
      connectionParams: () => {
        return { headers: getHeaders(tokenRef) };
      },
      connectionCallback: err => {
        if (err) {
          console.error('connectionCallback:', err);
          wsLink.subscriptionClient.close(false, false);
        }
      },
    })
  );

  // chose the link to use based on operation
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
      addTypename: true,
    }),
  });

  return client;
};

export default makeApolloClient;
