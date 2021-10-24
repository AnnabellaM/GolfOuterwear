const express = require('express');
const api = require('../api');
const cors = require('cors');

module.exports = ({ app }) => {
  // cors
  app.use(cors())

  // body parser
  app.use(express.json());

  // load routers
  app.use('/api', api());

  return app
}
