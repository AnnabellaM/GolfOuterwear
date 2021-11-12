const express = require('express');
const fileRouter = require('./file');
const productRouter = require('./product');
const customerRouter = require('./customer');

module.exports = () => {
  const router = express.Router();

  // file
  router.use('/files', fileRouter());

  // customer
  router.use('/customers', customerRouter());

  // admin

  // product
  router.use('/products', productRouter());

  // cart

  // order

  return router;
}
