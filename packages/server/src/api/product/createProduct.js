const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const mongoose = require('mongoose');
const {Product} = require("../../models/product");
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.post(
    // path
    '/',

    // verify token
    verifyToken(['admin']),

    // validator
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
      const {
        imageUrl,
        name,
        genre,
        price,
        currency,
        inventory,
        description,
      } = req.body;

      // build product doc
      const product = Product.build({
        id: new mongoose.Types.ObjectId(),
        imageUrl,
        name,
        genre,
        price,
        currency,
        inventory,
        description,
        isActive: true,
      });
      // save doc into db
      await product.save();

      res.status(201).send({
        id: product.id,
        imageUrl: product.imageUrl,
        name: product.name,
        genre: product.genre,
        price: product.price,
        currency: product.currency,
        inventory: product.inventory,
        description: product.description,
        isActive: product.isActive,
      });
    }
  );

  return router
}
