'use strict';

const del = require('del');
const gulp = require('gulp');

const constants = require('./constants');

gulp.task('clean', (done) => {
  del([constants.paths.public.js, constants.paths.server.common])
    .then(() => done());
});
