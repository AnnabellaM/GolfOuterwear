const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Cart} = require("../../models/cart");
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.put(
    // path
    '/products/:id/amount',

    // verify token
    verifyToken(),

    // validator
    validator.params(
      Joi.object({
        id: Joi.string().required(),
      })
    ),
    validator.body(
      Joi.object({
        amount: Joi.number().integer().required(),
      })
    ),

    // controller
    async (req, res) => {
      const {customerId} = req.auth;
      const productId = req.params.id;
      const amount = req.body.amount;

      if (amount <= 0) {
        return res.status(403).send({ message: `Product amount should at least be 1` });
      }

      // find customer's cart
      const cart = await Cart.findOne({ customerId: customerId });
      if (!cart) {
        return res.status(403).send({ message: `Cart not existed` });
      }

      // find target product
      const [item] = Array.from(cart.items).filter((i) => { return i.product.toString() === productId });
      if (!item) {
        return res.status(403).send({ message: `Product not existed in cart` });
      }

      item.amount = amount;
      await cart.save();

      res.status(200).send(cart.toJSON());
    }
  );

  return router
}
