const express = require('express');
const createOrderRouter = require('./createOrder');
const listOrdersRouter = require('./listOrders');

module.exports = () => {
  const router = express.Router();

  // create order
  router.use(createOrderRouter());

  // list orders
  router.use(listOrdersRouter());

  return router;
}
