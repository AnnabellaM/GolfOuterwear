const express = require('express');
const mongoose = require('mongoose');

const { Customer } = require('../../models/customer');

module.exports = () => {
  const router = express.Router();

  router.post(
    // path
    '/',

    // controller
    async (req, res) => {
      const {
        email,
        password,
        address,
        first_name,
        last_name,
        phone
      } = req.body;

      // build customer doc
      const customer = Customer.build({
        id: new mongoose.Types.ObjectId(),
        email,
        password,
        address,
        first_name,
        last_name,
        phone
      });

      // save doc into db
      await customer.save();

      res.send({
        id: customer.id,
        email: customer.email,
        password: customer.password,
        address: customer.address,
        first_name: customer.first_name,
        last_name: customer.last_name,
        phone: customer.phone
      });
    }
  );

  return router;
}
