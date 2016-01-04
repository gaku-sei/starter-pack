'use strict';

const port = process.env.PORT || 3000;

const server = require('./server');

server.listen(port, error => {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening http://localhost:%s/', port);
  }
});
