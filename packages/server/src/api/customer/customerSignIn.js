const express = require('express');
const {Customer} = require('../../models/customer');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});

module.exports = () => {
  const router = express.Router();

  router.post(
    // path
    '/sign-in',

    // validator
    validator.body(
      Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(1).required(),
      })
    ),

    // controller
    async (req, res) => {
      const {
        email,
        password
      } = req.body;

      // find customer
      const customer = await Customer.findOne({
        email: email,
        password: password,
      });

      // cannot find customer, response error
      if (!customer) {
        res.status(401).send({
          message: 'Email or password is incorrect'
        });
        return;
      }

      // response customer info
      const customerObj = customer.toJSON();
      delete customerObj.password;
      res.send(customerObj);
    }
  );

  return router;
}
