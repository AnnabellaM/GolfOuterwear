const express = require('express');
const {Admin} = require('../../models/admin');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const jwt = require('jsonwebtoken');
const config = require('../../config');

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

      // find admin
      const admin = await Admin.findOne({
        email: email,
        password: password,
      });

      // cannot find admin, response error
      if (!admin) {
        res.status(401).send({
          message: 'Email or password is incorrect'
        });
        return;
      }

      const token = jwt.sign({
        adminId: admin._id,
      }, config.jwt.secret)

      // response admin info
      res.send({
        token,
      });
    }
  );

  return router;
}
