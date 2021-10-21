const express = require('express');
const createProductRouter = require('./createProduct')

module.exports = () => {
  const router = express.Router();

  // list products

  // create product
  router.post('/', createProductRouter);

  // update product info

  // delete product

  return router;
}
