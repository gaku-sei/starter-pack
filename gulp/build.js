'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const webpack = require('webpack-stream');

const constants = require('./constants');
const webpackConfig = require(constants.paths.webpack.config);

gulp.task('copy:build', ['clean'], () =>
  gulp.src(constants.paths.common.json)
    .pipe(gulp.dest(constants.paths.server.common)));

gulp.task('compile:build', ['clean'], () =>
  constants.tsProject.src()
    .pipe(plugins.typescript(constants.tsProject))
    .pipe(plugins.babel())
    .pipe(gulp.dest(constants.paths.server.common)));

gulp.task('scss:build', ['clean'], () =>
  gulp.src(constants.paths.scss)
    .pipe(plugins.sass())
    .pipe(plugins.concat('main.css'))
    .pipe(plugins.cssnano())
    .pipe(gulp.dest(constants.paths.public.css)));

gulp.task('webpack:build', ['clean'], () =>
  gulp.src(constants.paths.common.entry)
    .pipe(webpack(webpackConfig))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(constants.paths.public.js)));
