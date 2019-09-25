import React, { useState } from 'react';
import { WebAuth } from 'auth0-js';

import { auth0Domain, auth0ClientId, auth0CallbackUrl } from './constants';
import { Auth0Context } from './Auth';

export default function Auth0Provider({ children }) {
  const [auth0] = useState(
    new WebAuth({
      domain: auth0Domain,
      clientID: auth0ClientId,
      redirectUri: auth0CallbackUrl,
      responseType: 'token id_token',
      scope: 'openid profile',
    })
  );

  const [auth, setAuth] = useState({
    accessToken: null,
    idToken: null,
    expiresAt: 0,
  });

  function isAuthenticated() {
    const result = new Date().getTime() < auth.expiresAt;
    console.log('isAuthenticated?', result);
    return result;
  }

  function login() {
    console.log('login');

    auth0.authorize();
  }

  function logout() {
    console.log('logout');

    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');

    setAuth({
      accessToken: null,
      idToken: null,
      expiresAt: 0,
    });
  }

  function parseHash() {
    console.log('parseHash');
    return new Promise((resolve, reject) => {
      auth0.parseHash((err, authResult) => {
        if (err) return reject(err);

        if (!authResult)
          return reject(new Error('authResult not complete', authResult));

        setSession(authResult);
        return resolve();
      });
    });
  }

  function setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    const { accessToken, idToken, expiresIn } = authResult;
    setAuth({
      accessToken,
      idToken,
      expiresAt: expiresIn * 1000 + new Date().getTime(),
    });
  }

  const context = {
    isAuthenticated,
    login,
    logout,
    parseHash,
  };

  return (
    <Auth0Context.Provider value={context}>{children}</Auth0Context.Provider>
  );
}
