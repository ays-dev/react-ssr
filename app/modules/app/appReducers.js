import {
  APP_INIT,
  APP_CLIENT_LOADED,
  APP_SERVER_SETUP
} from './appActions';

export default function app(state = {
  readyState: APP_INIT,
  appInitAt: new Date(),
  appClientLoadedAt: null,
  csrfToken: null
}, action) {
  switch (action.type) {
    case APP_SERVER_SETUP:
      return {
        ...state,
        csrfToken: action.csrfToken
      };
    case APP_CLIENT_LOADED:
      return {
        ...state,
        readyState: APP_CLIENT_LOADED,
        appClientLoadedAt: new Date()
      };
    default:
      return state;
  }
}
