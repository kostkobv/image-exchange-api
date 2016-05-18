'use strict';

const express = require('express');

/**
 * Inits the express server for app
 */
function init() {
  let app = express();

  app.get('/', (req, res) => {
    res.send('works');
  });

  app.listen(3000);
}

module.exports = {
  init
};