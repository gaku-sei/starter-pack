'use strict';

const gulp = require('gulp');

const node = require('./gulp/node');

require('./gulp/common');
require('./gulp/develop');
require('./gulp/build');

gulp.task('build', ['scss:build', 'webpack:build', 'compile:build', 'copy:build']);

gulp.task('default', ['watch'], node.start);
