'use strict';

module.exports = () => function* middleware(next) {
  this.navigator = global.navigator = {
    userAgent: this.headers['user-agent'],
  };
  yield next;
};
