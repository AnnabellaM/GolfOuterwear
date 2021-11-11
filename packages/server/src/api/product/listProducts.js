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
        genre: Joi.string().valid(
          'Jacket',
          'Vest',
        ).allow('').required(),
        limit: Joi.number().integer().required(),
        offset: Joi.number().integer().required(),
      })
    ),

    // controller
    async (req, res) => {
      const {
        keyword,
        genre,
        limit,
        offset,
      } = req.query;

      // find products
      const {
        docs,
        totalDocs,
      } = await Product.paginate(
        {
          // find docs where name like %keyword%. if keyword is undefined, it will use empty string instead
          name: {$regex: keyword || '', $options: 'i'},
          genre: {$regex: genre || '', $options: 'i'},
          isActive: true,
        },
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
