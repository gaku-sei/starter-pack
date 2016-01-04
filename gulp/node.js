'use strict';

const spawn = require('child_process').spawn;
const util = require('gulp-util');

const constants = require('./constants');

module.exports = new class {
  constructor() {
    this.process = null;
  }

  start(done) {
    const env = Object.assign({}, { NODE_ENV: 'development' }, process.env);
    const options = constants.node.options.concat(constants.node.path)
    this.process = spawn('node', options, { env });

    this.process.on('error', util.log);

    util.log(`Server has been started with ${options.join(' ')}`);

    this.process.stdout.pipe(process.stdout);
    this.process.stderr.pipe(process.stderr);

    this.process.on('close', (code) => {
      util.log(`Server has been stoped with code ${code || 0}`);
    });

    done();
  }

  kill(done) {
    if (this.process) {
      this.process.kill();
    }
    done();
  }
};
