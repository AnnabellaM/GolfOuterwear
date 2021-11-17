const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Order} = require("../../models/order");
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.get(
    // path
    '/',

    // verify token
    verifyToken(),

    // validator
    validator.query(
      Joi.object({
        limit: Joi.number().integer().required(),
        offset: Joi.number().integer().required(),
      })
    ),

    // controller
    async (req, res) => {
      const {
        limit,
        offset,
      } = req.query;

      // find products
      const {
        docs,
        totalDocs,
      } = await Order.paginate(
        {},
        {
          limit,
          offset,
          // descend order by createdAt
          sort: '-createdAt',
        },
      );

      // response products
      res.send({
        data: docs.map(d => d.toJSON()),
        pagination: {
          limit: limit,
          offset: offset,
          total: totalDocs,
        }
      });
    }
  );

  return router;
}
