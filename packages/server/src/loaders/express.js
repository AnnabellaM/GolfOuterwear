const express = require('express');
const api = require('../api');

module.exports = ({ app }) => {
  // body parser
  app.use(express.json());

  // load routers
  app.use('/api', api());

  return app
}
