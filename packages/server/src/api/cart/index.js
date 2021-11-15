const express = require('express');
const addProductToCartRouter = require('./addProductToCart');

module.exports = () => {
  const router = express.Router();

  // add product to cart
  router.use(addProductToCartRouter());

  return router;
}
