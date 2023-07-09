import './config';

import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';

import serverMiddleware from '../app/serverMiddleware';
import securityContext from './middlewares/securityContext';
import ajaxMiddleware from './routes';

// /* ********************************
//  * set-up express
//  ******************************** */

const server = express();
// const redirectToHTTPS = express();

const csrfProtection = csrf({ cookie: true });
const port = process.env.PORT || 3000;

server.use(cookieParser());
server.use(express.json());
server.use(csrfProtection);
server.use(morgan('dev'));
server.use(helmet());
server.use(hpp());

// server.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 700 // limit each IP to 700 requests per windowMs
});

//  apply to all requests
server.use(limiter);

// /* ********************************
//  * public files
//  ******************************** */

server.use(favicon(path.resolve(process.cwd(), 'public', 'favicon.ico')));
server.use(express.static(path.resolve(process.cwd(), 'public')));

// /* ********************************
//  * authenticate user
//  ******************************** */

server.use(securityContext);

//  ********************************
//  * async api
//  ********************************

server.use('/api', ajaxMiddleware);

// /* ********************************
//  * devtools and Hot Module Reloading
//  ******************************** */

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
  const config = require('../webpack.config.js');
  const universalCompiler = webpack(config);
  const clientCompiler = universalCompiler.compilers
    .find(compiler => compiler.name === 'client');

  server.use(webpackDevMiddleware(universalCompiler, { serverSideRender: true }));
  server.use(webpackHotMiddleware(clientCompiler));
  server.use(webpackHotServerMiddleware(universalCompiler));
}

// /* ********************************
//  * static files
//  ******************************** */

if (process.env.NODE_ENV === 'production') {
  const expressStaticGzip = require('express-static-gzip');
  const compression = require('compression');

  server.use(expressStaticGzip(path.resolve(process.cwd(), './dist/client')));
  server.use('/assets', express.static(path.resolve(process.cwd(), './dist/client')));
  server.use(compression());

  // /* ********************************
  //  * react pages
  //  ******************************** */

  server.get('*', serverMiddleware());
}

server.use((err, req, res, next) => {
  console.error(err.stack);
  process.exit(-1);
  // next(err);
});

// const credentials = {
//   key: fs.readFileSync('./api/ssl/keys/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.key'),
//   cert: fs.readFileSync('./api/ssl/certs/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.crt')
// };

// redirectToHTTPS.get('*', (req, res) => {
//   const queryString = querystring.stringify(req.query);

//   return res.redirect(`https://127.0.0.1:3030${req.path}${queryString ? `?${queryString}` : ''}`);
// });

const httpServer = http.createServer();

// const httpServer = http.createServer(redirectToHTTPS);
// const httpsServer = https.createServer(credentials, server);

httpServer.listen(port);
// httpsServer.listen(3030);

// // /* ********************************
// //  * listen HTTP server
// //  ******************************** */

// server.listen(port, err => {
//   if (err) console.error(err);
//   console.info('⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡');
//   console.info(`⚡⚡⚡⚡⚡⚡⚡⚡ Server running on http://127.0.0.1:${port}/ ⚡⚡⚡⚡⚡⚡⚡⚡`);
//   console.info('⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡');
// });
