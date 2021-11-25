const express = require('express');
const fileRouter = require('./file');
const productRouter = require('./product');
const customerRouter = require('./customer');
const adminRouter = require('./admin');
const cartRouter = require('./cart');
const orderRouter = require('./order');

module.exports = () => {
  const router = express.Router();

  // file
  router.use('/files', fileRouter());

  // customer
  router.use('/customers', customerRouter());

  // admin
  router.use('/admins', adminRouter());

  // product
  router.use('/products', productRouter());

  // cart
  router.use('/cart', cartRouter());

  // order
  router.use('/orders', orderRouter());

  return router;
}
