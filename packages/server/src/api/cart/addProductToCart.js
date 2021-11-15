const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Cart} = require("../../models/cart");

module.exports = () => {
  const router = express.Router();

  router.post(
    // path
    '/products/:id',

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

      // check if the product is already existed
        // yes
          // amount ++
        // no
          // add item in to cart { productId, amount: 1 }
      const [item] = Array.from(cart.items).filter((i) => { return i.productId.toString() === productId });
      if (item) {
        item.amount++;
      } else {
        cart.items.push({
          productId: productId,
          amount: 1,
        });
      }
      await cart.save();

      res.status(200).send(cart.toJSON());
    }
  );

  return router
}
