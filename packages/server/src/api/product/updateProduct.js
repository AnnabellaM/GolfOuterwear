const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Product} = require("../../models/product");
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.put(
    // path
    '/:id',

    // verify token
    verifyToken(['admin']),

    // validator
    validator.params(
      Joi.object({
        id: Joi.string().required(),
      })
    ),
    validator.body(
      Joi.object({
        imageUrl: Joi.string().uri().allow('').required(),
        name: Joi.string().min(1).max(64).required(),
        genre: Joi.string().valid('Jacket', 'Vest').required(),
        price: Joi.number().positive().min(0).max(Number.MAX_SAFE_INTEGER).required(),
        currency: Joi.string().valid('USD', 'RMB').required(),
        inventory: Joi.number().integer().required(),
        description: Joi.string().allow('').required(),
      })
    ),

    // controller
    async (req, res) => {
      const productId = req.params.id
      const {
        imageUrl,
        name,
        genre,
        price,
        currency,
        inventory,
        description,
      } = req.body;

      // find product doc
      const product = await Product.findById(productId);

      // modify info
      product.imageUrl = imageUrl;
      product.name = name;
      product.genre = genre;
      product.price = price;
      product.currency = currency;
      product.inventory = inventory;
      product.description = description;

      // update doc into db
      await product.save();

      res.send(product.toJSON());
    }
  );

  return router
}
