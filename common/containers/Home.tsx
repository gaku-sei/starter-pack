'use strict';

import * as React from 'react';
import { connect } from 'react-redux';

import { id } from '../services/util';

const { Component } = React;

interface IProps extends React.HTMLProps<Home> {
  cheers: string;
}

class Home extends Component<IProps, void> {
  render(): JSX.Element {
    return (
      <h1>{this.props.cheers}</h1>
    );
  }
}

export default connect(id)(Home);
