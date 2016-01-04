'use strict';

const path = require('path');
const qs = require('querystring');

const ejs = require('ejs');
const Provider = require('react-redux').Provider;
const ReactDOMServer = require('react-dom/server');
const React = require('react');
const serialize = require('serialize-javascript');

const moduleExists = require('../services/util').moduleExists;

module.exports = (layout, views, name, options) => new Promise((resolve, reject) => {
  options = options || {};
  try {
    const storeName = !moduleExists(options.store || name) ? 'default' : options.store || name;
    const storePath = path.resolve(__dirname, '../common/stores/', storeName);
    const store = require(storePath).default(options.props);
    const component = require(path.resolve(views, name)).default;
    const state = store.getState();

    ejs.renderFile(layout, {
      data: qs.escape(serialize({
        state,
        paths: {
          container: `./containers/${name}`,
          store: `./stores/${storeName}`,
        },
      })),
      content: ReactDOMServer.renderToString(
        React.createElement(Provider, { store },
          React.createElement(component, state)
        )
      ),
    }, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  } catch (e) {
    reject(e);
  }
});
