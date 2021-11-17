const express = require('express');
const {Customer} = require('../../models/customer');
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.get(
    // path
    '/me',

    // verify token
    verifyToken(),

    // controller
    async (req, res) => {
      const { customerId } = req.auth;

      // find customer
      const customer = await Customer.findOne({ _id: customerId });

      // cannot find customer, response error
      if (!customer) {
        res.status(403).send({
          message: 'Customer not existed'
        });
        return;
      }

      const customerObj = customer.toJSON();
      delete customerObj.password;

      // response customer info
      res.send(customerObj);
    }
  );

  return router;
}
