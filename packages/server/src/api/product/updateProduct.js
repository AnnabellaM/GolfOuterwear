const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Product} = require("../../models/product");

module.exports = () => {
  const router = express.Router();

  router.put(
    // path
    '/:id',

    // validator
    validator.params(
      Joi.object({
        id: Joi.string().required(),
      })
    ),
    validator.body(
      Joi.object({
        name: Joi.string().min(1).max(64).required(),
        price: Joi.number().positive().min(0).max(Number.MAX_SAFE_INTEGER).required(),
        currency: Joi.string().valid('USD', 'RMB').required(),
        unit: Joi.string().valid('pair', 'box', 'bag', 'piece').required(),
        description: Joi.string().allow('').required(),
        imageUrl: Joi.string().uri().allow('').required(),
        stock: Joi.number().integer().required(),
        isActive: Joi.boolean().required(),
      })
    ),

    // controller
    async (req, res) => {
      const productId = req.params.id
      const {
        name,
        price,
        currency,
        unit,
        description,
        imageUrl,
        stock,
      } = req.body;

      // find product doc
      const product = await Product.findById(productId);

      // modify info
      product.name = name;
      product.price = price;
      product.currency = currency;
      product.unit = unit;
      product.description = description;
      product.imageUrl = imageUrl;
      product.stock = stock;

      // update doc into db
      await product.save();

      res.send({
        id: product.id,
        name: product.name,
        price: product.price,
        currency: product.currency,
        unit: product.unit,
        description: product.description,
        imageUrl: product.imageUrl,
        stock: product.stock,
        isActive: product.isActive,
      });
    }
  );

  return router
}
