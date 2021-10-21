const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Product} = require("../../models/product");

module.exports = () => {
  const router = express.Router();

  router.delete(
    // path
    '/:id',

    // validator
    validator.params(
      Joi.object({
        id: Joi.string().required(),
      })
    ),

    // controller
    async (req, res) => {
      const productId = req.params.id

      // delete product
      await Product.updateOne({ _id: productId }, { isActive: false });

      res.status(204).send();
    }
  );

  return router
}
