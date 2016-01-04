'use strict';

import { createStore } from 'redux';

import { reducer, IState } from '../reducers/default';

export default function(state: IState) {
  return createStore(reducer, state);
};
