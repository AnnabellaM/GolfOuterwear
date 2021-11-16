const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');
const validator = require('express-joi-validation').createValidator({});
const {Cart} = require("../../models/cart");
const {Order} = require("../../models/order");

module.exports = () => {
  const router = express.Router();

  router.post(
    // path
    '/',

    // validator
    validator.body(
      Joi.object({
        payment: Joi.object({
          method: Joi.string().valid('creditcard', 'paypal', 'applepay').required(),
          detail: Joi.object().allow(null).required(),
        }).required(),
        shipment: Joi.object({
          email: Joi.string().email().required(),
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          phone: Joi.string().required(),
          address: Joi.string().required(),
        }).required(),
      })
    ),

    // controller
    async (req, res) => {
      // const {customerId} = req.auth;
      const customerId = '61929a1291f4d4016e60030a';
      const {
        payment,
        shipment,
      } = req.body;

      // find customer's cart
      const cart = await Cart.findOne({customerId: customerId}).populate('items.product')
      if (!cart) {
        return res.status(403).send({message: `Cart not existed`});
      }

      // save order
      const order = Order.build({
        id: new mongoose.Types.ObjectId(),
        customer: customerId,
        items: cart.items.map(i => ({
          product: {
            _id: i.product._id,
            imageUrl: i.product.imageUrl,
            name: i.product.name,
            genre: i.product.genre,
            price: i.product.price,
            currency: i.product.currency,
            description: i.product.description,
          },
          amount: i.amount,
          totalPrice: i.amount * i.product.price,
        })),
        payment: {
          method: payment.method,
          detail: payment.detail,
        },
        shipment: {
          email: shipment.email,
          firstName: shipment.firstName,
          lastName: shipment.lastName,
          phone: shipment.phone,
          address: shipment.address,
        },
        amount: cart.items.reduce((p, c) => p + c.amount, 0),
        totalPrice: cart.items.reduce((p, c) => p + (c.amount * c.product.price), 0),
        createdAt: new Date(),
      })
      await order.save();

      // clear the cart
      cart.items = [];
      await cart.save();

      res.status(201).send(order.toJSON());
    }
  );

  return router
}
