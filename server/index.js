'use strict';

require('babel-polyfill');

const path = require('path');

const koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');

const middlewares = require('./middlewares');
const routes = require('./routes');

const app = new koa();

if (process.env.NODE_ENV !== 'production') {
  app.use(require('koa-proxy')({
    host: 'http://localhost:8080',
    match: /^\/public\/js\//,
  }));
}

app.use(mount('/vendors', serve(path.resolve(__dirname, '..', 'node_modules'))));

app.use(mount('/public', serve(path.resolve(__dirname, '..', 'public'))));

app.use(middlewares.userAgent());

app.use(middlewares.render({
  layout: path.resolve(__dirname, 'views', 'index.ejs'),
  views: path.resolve(__dirname, 'common', 'containers'),
}));

app.use(mount('/', routes));

module.exports = app;
