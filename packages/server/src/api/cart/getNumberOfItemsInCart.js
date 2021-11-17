const express = require('express');
const {Cart} = require("../../models/cart");
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.get(
    // path
    '/items/number',

    // verify token
    verifyToken(['customer']),

    // controller
    async (req, res) => {
      const {customerId} = req.auth;

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
