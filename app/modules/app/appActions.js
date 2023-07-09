import * as UserActions from '../user/userActions';

export const APP_INIT = 'APP_INIT';
export const APP_SERVER_SETUP = 'APP_SERVER_SETUP';
export const APP_CLIENT_LOADED = 'APP_CLIENT_LOADED';

// Set-up store for first rendering
export function setInitialProps(user, csrfToken) {
  return dispatch => {
    if (user) dispatch({ type: UserActions.USER_SIGNED_IN, user });
    if (typeof window === 'undefined') dispatch({ type: APP_SERVER_SETUP, csrfToken });
  };
}

// Set store after client first rendering
export function appClientLoaded() {
  return (dispatch, getState) => {
    const state = getState();
    const { readyState } = state.app;

    if (readyState === APP_INIT) dispatch({ type: APP_CLIENT_LOADED });
  };
}
