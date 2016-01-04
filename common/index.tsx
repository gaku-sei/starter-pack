'use strict';

import 'whatwg-fetch';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

import { Provider } from 'react-redux';

injectTapEventPlugin();

const { paths, state = {} } = window.__INIT__;

const store = require(paths.store).default(state);
const Container = require(paths.container).default as React.ClassicComponentClass<any>;

ReactDom.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('root')
);
