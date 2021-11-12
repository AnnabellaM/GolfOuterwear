const express = require('express');
const api = require('../api');
const cors = require('cors');
const fileUpload = require('express-fileupload');

module.exports = ({ app }) => {
  // cors
  app.use(cors())

  // body parser
  app.use(express.json());

  // file upload
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
  }));

  // load routers
  app.use('/api', api());

  return app
}
