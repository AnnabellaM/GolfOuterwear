const express = require('express');
const createProductRouter = require('./createProduct');
const listProductsRouter = require('./listProducts');

module.exports = () => {
  const router = express.Router();

  // list products
  router.use('/', listProductsRouter());

  // create product
  router.use('/', createProductRouter());

  // update product info

  // delete product

  return router;
}
