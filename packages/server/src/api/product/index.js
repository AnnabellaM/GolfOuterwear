const express = require('express');
const createProductRouter = require('./createProduct');
const listProductsRouter = require('./listProducts');
const updateProductRouter = require('./updateProduct');

module.exports = () => {
  const router = express.Router();

  // list products
  router.use(listProductsRouter());

  // create product
  router.use(createProductRouter());

  // update product info
  router.use(updateProductRouter());

  // delete product

  return router;
}
