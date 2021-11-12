const express = require('express');
const uploadFileRouter = require('./uploadFile');
const getFileStream = require('./getFileStream');

module.exports = () => {
  const router = express.Router();

  // upload file
  router.use(uploadFileRouter());

  // get file stream
  router.use(getFileStream());

  return router;
}
