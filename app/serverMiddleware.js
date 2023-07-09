import React from'react';
import { renderToString, renderToStaticMarkup, renderToNodeStream } from'react-dom/server';
import serialize from'serialize-javascript';
import { HeadProvider, Title } from'react-head';
import parseQueryString from'query-string';
import { Provider } from'react-redux';
import { StaticRouter } from'react-router-dom';
import { renderRoutes } from'react-router-config';
import { matchRoutes } from 'react-router-config';

import { routes } from'../app/routes';
import configureStore from'../app/config/store';
import loadRouteData from'../app/loadRouteData';
import loadRouteMeta from'../app/loadRouteMeta';

export default function serverRenderer({ clientStats, serverStats } = {}) {
  return (req, res, next) => {
    const initialState = {};
    const store = configureStore({ initialState, csrfToken: req.csrfToken(), user: req.context.user });
    const parsedUrl = parseQueryString.parseUrl(req.originalUrl);
    const branch = matchRoutes(routes, parsedUrl.url);

    loadRouteData(branch, parsedUrl.query, store.dispatch)
      .then(() => {
        const [metadata, context] = loadRouteMeta(branch, parsedUrl.query, store.getState);

        if (context.status >= 300 && context.status < 400) {
          return res.redirect(context.status, context.to);
        }

        if (context.status === 404) {
          res.status(404);
        }

        const app = renderToNodeStream(
          <Provider store={store}>
            <StaticRouter context={{}} location={{ pathname: parsedUrl.url, search: `?${req.url.split('?')[1]}` }}>
              {renderRoutes(routes)}
            </StaticRouter>
          </Provider>
        );

        const headTags = [];
              console.log('metadata', metadata)
        renderToString(
          <HeadProvider headTags={headTags}>
            <div>
              {metadata}
            </div>
          </HeadProvider>
        );

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

        res.write(`${'<!doctype html><html lang="en"><head><meta charset="utf-8">'
          + '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">'}${
          renderToStaticMarkup(headTags)
        }<link rel="stylesheet" href="/assets/style.css" /></head><body><div id="root">`);
        app.pipe(res, { end: false });
        return app.on('end', () => {
          res.write(`</div><script>window.ENV = '${process.env.NODE_ENV}';`
            + `window.INITIAL_STATE = ${serialize(store.getState(), { isJSON: true })};`
            + '</script><script src="/assets/app.js" async defer></script></body></html>');
          res.end();
        });
      });
  }
};
