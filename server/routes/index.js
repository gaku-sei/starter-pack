'use strict';

const koa = require('koa');
const router = require('koa-route');

const main = koa();

main.use(router.get('/', function* index() {
  this.body = yield this.render('Home', {
    props: { cheers: 'Coucou' },
  });
}));

module.exports = main;
