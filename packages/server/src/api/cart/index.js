const express = require('express');
const getCart = require('./getCart');
const addProductToCartRouter = require('./addProductToCart');

module.exports = () => {
  const router = express.Router();

  // add product to cart
  router.use(addProductToCartRouter());

  // get cart
  router.use(getCart())

  return router;
}
