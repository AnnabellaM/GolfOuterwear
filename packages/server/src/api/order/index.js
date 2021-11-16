const express = require('express');
const createOrderRouter = require('./createOrder');

module.exports = () => {
  const router = express.Router();

  // create order
  router.use(createOrderRouter());

  return router;
}
