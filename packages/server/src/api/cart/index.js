const express = require('express');
const getCart = require('./getCart');
const addProductToCartRouter = require('./addProductToCart');
const removeProductFromCartRouter = require('./removeProductFromCart');
const changeProductAmountInCart = require('./changeProductAmountInCart');

module.exports = () => {
  const router = express.Router();

  // change product amount in cart
  router.use(changeProductAmountInCart());

  // add product to cart
  router.use(addProductToCartRouter());

  // remove product from cart
  router.use(removeProductFromCartRouter());

  // get cart
  router.use(getCart())

  return router;
}
