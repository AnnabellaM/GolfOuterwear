const express = require('express');
const createCustomerRouter = require('./createCustomer');
const customerSignInRouter = require('./customerSignIn');

module.exports = () => {
  const router = express.Router();

  // create customer
  router.use(createCustomerRouter());

  router.use(customerSignInRouter());

  return router;
}
