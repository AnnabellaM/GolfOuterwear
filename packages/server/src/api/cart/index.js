const express = require('express');
const getCart = require('./getCart');
const addProductToCartRouter = require('./addProductToCart');
const changeProductAmountInCart = require('./changeProductAmountInCart');

module.exports = () => {
  const router = express.Router();

  // change product amount in cart
  router.use(changeProductAmountInCart());

  // add product to cart
  router.use(addProductToCartRouter());

  // get cart
  router.use(getCart())

  return router;
}
