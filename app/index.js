import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import fetchIntercept from 'fetch-intercept';
import Promise from 'bluebird';
import { HeadProvider } from 'react-head';

import { routes } from './routes';
import configureStore from './config/store';
import { appClientLoaded } from './modules/app/appActions';

// import './views/index.scss'
import './index.scss'

function request(url = '', options = {}) {
  options = { ...options, credentials: 'same-origin' };
  options.headers = { ...options.headers, 'Content-Type': 'application/json; charset=utf-8' };

  //todo: only relatives
  url = typeof window === 'undefined'
    ? `${config[process.env.NODE_ENV].baseUrl}${url}`
    : url;

  return [url, options];
}

fetchIntercept.register({
  request
});


const isClient = typeof document !== 'undefined';

if (isClient) {
  window.Promise = Promise;

  Promise.config({
    cancellation: true,
    warnings: false
  });

  const store = configureStore({ initialState: window.INITIAL_STATE });
  const rootElement = document.getElementById('root');
  const initStore = state => store.dispatch(appClientLoaded(state));

  // Prevent scroll to be restored after history navigation
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const render = currentRoutes => {
    const renderApp = () => (
      <Provider store={store}>
        <BrowserRouter>
          <HeadProvider>
            {renderRoutes(currentRoutes)}
          </HeadProvider>
        </BrowserRouter>
      </Provider>
    );

    if (process.env.NODE_ENV === 'development') {
      const { AppContainer } = require('react-hot-loader');

      ReactDOM.hydrate(
        <AppContainer>{renderApp()}</AppContainer>,
        rootElement,
        initStore({ hot: true })
      );
    } else {
      ReactDOM.hydrate(
        renderApp(),
        rootElement,
        initStore()
      );
    }
  }

  render(routes);

  if (module.hot) {
    // Enable webpack hot module replacement for routes
    module.hot.accept('./routes', () => {
      try {
        const { routes: nextRoutes } = require('./routes');

        render(nextRoutes);
      } catch (error) {
        console.error(`==> 😭  Routes hot reloading error ${error}`);
      }
    })
  }
}
