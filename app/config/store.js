import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import * as AppActions from '../modules/app/appActions';
import rootReducer from '../modules/reducers';

// https://addons.mozilla.org/fr/firefox/addon/remotedev/
const reduxDevTools = () => window.__REDUX_DEVTOOLS_EXTENSION__
  && window.__REDUX_DEVTOOLS_EXTENSION__();

// redux-thunk enable async dispatch of actions
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

function createStoreWithInitialState(initialState) {
  const enableReduxDevTools = typeof window !== 'undefined' && process.env.NODE_ENV !== 'production';

  // Do not use devTool in production
  if (enableReduxDevTools) {
    return createStoreWithMiddleware(rootReducer, initialState, reduxDevTools());
  }
  return createStoreWithMiddleware(rootReducer, initialState);
}

let store = null;

export function getStore() {
  return store;
}

export default function configureStore({ initialState, csrfToken, user }) {
  store = createStoreWithInitialState(initialState);

  // Enable auto reload of reducers
  if (module.hot) {
    module.hot.accept('../modules/reducers', () => {
      const nextRootReducer = require('../modules/reducers').default;
      return store.replaceReducer(nextRootReducer);
    });
  }

  // Set-up user state
  store.dispatch(AppActions.setInitialProps(user, csrfToken));

  return store;
}
