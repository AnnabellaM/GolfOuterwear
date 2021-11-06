const express = require('express');
const { Customer } = require('../../models/customer');

module.exports = () => {
  const router = express.Router();

  router.get(
    // path
    '/',

    // controller
    async (req, res) => {
      const {
        email,
        password
      } = req.query;

      // find customer
      const customer = await Customer.findOne(
        {
          email: email,
          password: password,
        });

      // response customer info
      res.send({
        email: customer.email,
        password: customer.password,
      });
    }
  );

  return router;
}
