const express = require('express');
const bodyParser = require('body-parser');

const register = require('./register');

/**
 * Inits the express server for app
 */
function init() {
  let app = express();

  app.use(bodyParser.json());

  app.post('/register', (req, res) => {
    register(req.body)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

  return app.listen(3000);
}

module.exports = {
  init
};