'use strict';

const plugins = require('gulp-load-plugins')();

exports.tsProject = plugins.typescript.createProject('tsconfig.json', {
  module: 'commonjs',
  typescript: require('typescript'),
});


exports.paths = {
  common: {
    root: './common',
    react: './common/**/*.{ts,tsx}',
    entry: './common/index.js',
    json: './common/**/*.json',
  },
  server: {
    root: './server',
    noReact: ['./server/**/*.js', '!./server/common/**/*.js'],
    common: './server/common',
  },
  mainCss: './public/css/main.css',
  public: {
    js: './public/js',
    css: './public/css',
  },
  scss: './scss/**/*.scss',
  webpack: {
    config: '../webpack.config.js',
  },
};

exports.node = {
  path: 'index.js',
  options: [],
};
