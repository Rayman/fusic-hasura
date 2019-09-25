import { createContext, useContext } from 'react';

export const Auth0Context = createContext();

export function useAuth() {
  return useContext(Auth0Context);
}
