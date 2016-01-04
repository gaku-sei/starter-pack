'use strict';

const path = require('path');
const webpack = require('webpack');

const paths = {
  entry: [
    'babel-polyfill',
    './common/index'
  ],
  js: path.join(__dirname, 'public', 'js'),
};

module.exports = {
  entry: paths.entry,
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: paths.js,
    publicPath: '/public/js/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: paths.js,
  },
  module: {
    loaders: [
      {
        test: /\.ts(x)?$/,
        exclude: '/node_modules/',
        loaders: ['babel-loader', 'ts-loader'],
      },
    ],
  },
};
