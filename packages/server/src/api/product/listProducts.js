const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {Product} = require("../../models/product");

module.exports = () => {
  const router = express.Router();

  router.get(
    // path
    '/',

    // validator
    validator.query(
      Joi.object({
        keyword: Joi.string().allow('').required(),
        limit: Joi.number().integer().required(),
        offset: Joi.number().integer().required(),
      })
    ),

    // controller
    async (req, res) => {
      const {
        keyword,
        limit,
        offset,
      } = req.query;

      // find products
      const {
        docs,
        totalDocs,
      } = await Product.paginate(
        // find docs where name like %keyword%. if keyword is undefined, it will use empty string instead
        {name: {$regex: keyword || '', $options: 'i'}},
        {
          limit,
          offset,
          // descend order by createdAt
          sort: '-createdAt',
        },
      );

      // response products
      res.send({
        data: docs.map(d => ({
          name: d.name,
          price: d.price,
          currency: d.currency,
          unit: d.unit,
          description: d.description,
          imageUrl: d.imageUrl,
          stock: d.stock,
          isActive: d.isActive,
        })),
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
