'use strict';

const engines = require('../engines');

module.exports = (settings) => function* middleware(next) {
  this.render = (name, options) =>
    engines.react(settings.layout, settings.views, name, options);
  yield next;
};
