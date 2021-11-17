const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Cart} = require("../../models/cart");
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.delete(
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
      // const {customerId} = req.auth;
      const customerId = '61929a1291f4d4016e60030a';
      const productId = req.params.id;

      // find customer's cart
      const cart = await Cart.findOne({ customerId: customerId });
      if (!cart) {
        return res.status(403).send({ message: `Cart not existed` });
      }

      const index = Array.from(cart.items).findIndex((i) => i.product.toString() === productId)
      cart.items.splice(index, 1);
      await cart.save();

      res.status(200).send(cart.toJSON());
    }
  );

  return router
}
