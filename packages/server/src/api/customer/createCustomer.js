const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

const { Customer } = require('../../models/customer');

module.exports = () => {
  const router = express.Router();

  router.post(
    // path
    '/',

    // validator
    validator.body(
      Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(1).required(),
        address: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phone: Joi.string().required(),
      })
    ),

    // controller
    async (req, res) => {
      const {
        email,
        password,
        address,
        firstName,
        lastName,
        phone
      } = req.body;

      // build customer doc
      const customer = Customer.build({
        id: new mongoose.Types.ObjectId(),
        email,
        password,
        address,
        firstName,
        lastName,
        phone
      });

      // save doc into db
      await customer.save();

      res.send({
        id: customer.id,
        email: customer.email,
        password: customer.password,
        address: customer.address,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone
      });
    }
  );

  return router;
}
