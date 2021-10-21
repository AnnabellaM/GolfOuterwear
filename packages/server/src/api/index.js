const express = require('express');
const productRouter = require('./product');

module.exports = () => {
  const router = express.Router();

  // customer

  // admin

  // product
  router.use('/products', productRouter());

  // cart

  // order

  return router;
}
