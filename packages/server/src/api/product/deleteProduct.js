const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Product} = require("../../models/product");
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.delete(
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

    // controller
    async (req, res) => {
      const productId = req.params.id

      // soft delete the product
      await Product.updateOne({ _id: productId }, { isActive: false });

      // response without content
      res.status(204).send();
    }
  );

  return router
}
