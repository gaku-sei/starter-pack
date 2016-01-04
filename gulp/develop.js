'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const constants = require('./constants');
const node = require('./node');
const webpackConfig = require(constants.paths.webpack.config);

gulp.task('node:kill', node.kill);

gulp.task('node:restart', ['node:kill'], node.start);

gulp.task('webpack', ['node:kill'], (done) =>
  new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
  }).listen(8080, 'localhost', (err) => {
    if (err) {
      plugins.util.log(err);
    }
    done();
  }));

gulp.task('compile', ['node:kill'], () =>
  constants.tsProject.src()
    .pipe(plugins.typescript(constants.tsProject)
      .on('error', function error(err) {
        plugins.util.log(err);
        this.emit('end');
      }))
    .pipe(plugins.babel()
      .on('error', function error(err) {
        plugins.util.log(err);
        this.emit('end');
      }))
    .pipe(gulp.dest(constants.paths.server.common)));

gulp.task('copy', ['node:kill'], () =>
  gulp.src(constants.paths.common.json)
    .pipe(gulp.dest(constants.paths.server.common)));

gulp.task('scss', () =>
  gulp.src(constants.paths.scss)
    .pipe(plugins.sass()
      .on('error', function error(err) {
        plugins.util.log(err);
        this.emit('end');
      }))
    .pipe(plugins.concat('main.css'))
    .pipe(gulp.dest(constants.paths.public.css)));

gulp.task('node-after-compile', ['copy', 'compile'], node.start);

gulp.task('node-after-copy', ['copy'], node.start);

gulp.task('watch', ['scss', 'webpack', 'compile', 'copy'], () => {
  gulp.watch(constants.paths.scss, ['scss']);
  gulp.watch(constants.paths.common.react, ['node-after-compile']);
  gulp.watch(constants.paths.server.noReact, ['node:restart']);
  gulp.watch(constants.paths.common.json, ['node-after-copy']);
});
