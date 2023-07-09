import 'isomorphic-fetch';
import fetchIntercept from 'fetch-intercept';
import bluebird from 'bluebird';

import config from './config';

import './database';

if (process.env.NODE_ENV !== 'production') {
  bluebird.config({
    longStackTraces: true
  });
}

// todo: remove iso-fetch
function request(url = '', options = {}) {
  options = { ...options, credentials: 'same-origin' };
  options.headers = { ...options.headers, 'Content-Type': 'application/json; charset=utf-8' };

  // todo: only relatives
  url = typeof window === 'undefined'
    ? `${config[process.env.NODE_ENV].baseUrl}${url}`
    : url;

  return [url, options];
}

fetchIntercept.register({
  request
});
