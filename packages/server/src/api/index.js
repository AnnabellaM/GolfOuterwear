const express = require('express');
const productRouter = require('./product');
const customerRouter = require('./customer');

module.exports = () => {
  const router = express.Router();

  // customer
  router.use('/customers', customerRouter());

  // admin

  // product
  router.use('/products', productRouter());

  // cart

  // order

  return router;
}
