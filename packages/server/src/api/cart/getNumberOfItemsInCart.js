const express = require('express');
const {Cart} = require("../../models/cart");

module.exports = () => {
  const router = express.Router();

  router.get(
    // path
    '/items/number',

    // controller
    async (req, res) => {
      // const {customerId} = req.auth;
      const customerId = '61929a1291f4d4016e60030a';

      // find customer's cart
      const cart = await Cart.findOne({ customerId: customerId })
      if (!cart) {
        return res.status(403).send({ message: `Cart not existed` });
      }

      res.status(200).send({
        value: cart.items.length
      });
    }
  );

  return router
}
