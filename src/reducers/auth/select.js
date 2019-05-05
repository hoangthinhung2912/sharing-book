import { compose } from 'ramda';

export const getAuthState = state => state.auth;

export const getAuthAppState = compose(
  authState => authState.appState,
  getAuthState,
);