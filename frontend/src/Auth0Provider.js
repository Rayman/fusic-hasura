import React, { useState, useEffect } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

import { auth0Domain, auth0ClientId } from './constants';
import { Auth0Context } from './Auth';

export default function Auth0Provider({ children }) {
  const [auth0, setAuth0] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  function loginWithRedirect() {
    console.log('loginWithRedirect');
    auth0.loginWithRedirect();
  }

  function loginWithPopup() {
    console.log('loginWithPopup');
    return auth0.loginWithPopup();
  }

  function logout() {
    console.log('logout');
    return auth0.logout();
  }

  useEffect(() => {
    createAuth0Client({
      domain: auth0Domain,
      client_id: auth0ClientId,
      redirect_uri: window.location.origin,
    }).then(auth0 => {
      setAuth0(auth0);
      window.auth0 = auth0;
    });
  }, []);

  useEffect(() => {
    if (!auth0) return;

    function checkAuthenticated() {
      auth0.isAuthenticated().then(isAuthenticated => {
        setIsAuthenticated(isAuthenticated);
      });
    }

    if (window.location.search.includes('code=')) {
      auth0
        .handleRedirectCallback()
        .then(_ => {
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        })
        .then(checkAuthenticated);
    } else {
      checkAuthenticated();
    }
  }, [auth0]);

  /**
   * Every x seconds, call getTokenSilently and update the context token
   * The getTokenSilently call is an async function, so let's do a setTimeout loop to prevent calling this method while it's busy
   */
  let timerId = -1;
  useEffect(() => {
    function checkToken() {
      if (auth0) {
        console.debug('checking auth0 token...');
        auth0.getIdTokenClaims().then(({ __raw: newToken }) => {
          if (newToken !== token) {
            console.log(newToken);
            setToken(newToken);
          }
          timerId = setTimeout(checkToken, 5000);
        });
      } else {
        timerId = setTimeout(checkToken, 5000);
      }
    }

    clearTimeout(timerId);
    checkToken();
    return () => {
      clearTimeout(timerId);
    };
  }, [auth0, token]);

  const context = {
    isAuthenticated,
    loginWithRedirect,
    loginWithPopup,
    logout,
    token,
  };

  return (
    <Auth0Context.Provider value={context}>{children}</Auth0Context.Provider>
  );
}
