const express = require('express');
const createCustomerRouter = require('./createCustomer');
const fetchCustomerRouter = require('./fetchCustomer');

module.exports = () => {
  const router = express.Router();

  // create customer
  router.use(createCustomerRouter());

  router.use(fetchCustomerRouter());

  return router;
}