import React, { useMemo, useRef } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';

// import before app styles
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import makeApolloClient from './apollo';
import { useAuth } from './Auth';
import Auth0Provider from './Auth0Provider';
import * as serviceWorker from './serviceWorker';

function Wrapper() {
  const { token } = useAuth();
  const tokenRef = useRef(token);
  tokenRef.current = token;

  // makeApolloClient should only be called once
  const client = useMemo(() => makeApolloClient(tokenRef), []);
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

ReactDOM.render(
  <Auth0Provider>
    <Wrapper />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
