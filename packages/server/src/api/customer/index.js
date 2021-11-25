const express = require('express');
const customerSignInRouter = require('./customerSignIn');
const getMyInfoRouter = require('./getMyInfo');
const createCustomerRouter = require('./createCustomer');

module.exports = () => {
  const router = express.Router();

  // customer sign in
  router.use(customerSignInRouter());

  // get my info
  router.use(getMyInfoRouter());

  // create customer
  router.use(createCustomerRouter());

  return router;
}
