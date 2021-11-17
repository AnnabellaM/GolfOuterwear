const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Cart} = require("../../models/cart");
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.post(
    // path
    '/products/:id',

    // verify token
    verifyToken(),

    // validator
    validator.params(
      Joi.object({
        id: Joi.string().required(),
      })
    ),

    // controller
    async (req, res) => {
      const {customerId} = req.auth;
      const productId = req.params.id;

      // find customer's cart
      const cart = await Cart.findOne({ customerId: customerId });
      if (!cart) {
        return res.status(403).send({ message: `Cart not existed` });
      }

      // check if the product is already existed
        // yes
          // amount ++
        // no
          // add item in to cart { productId, amount: 1 }
      const [item] = Array.from(cart.items).filter((i) => { return i.product.toString() === productId });
      if (item) {
        item.amount++;
      } else {
        cart.items.push({
          product: productId,
          amount: 1,
        });
      }
      await cart.save();

      res.status(200).send(cart.toJSON());
    }
  );

  return router
}
