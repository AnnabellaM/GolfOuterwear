const express = require('express');
const Joi = require('joi');
const validator = require('express-joi-validation').createValidator({});
const {File} = require('../../models/file');
const fs = require('fs');

module.exports = () => {
  const router = express.Router();

  router.get(
    // path
    '/:id/:filename',

    // validator
    validator.params(
      Joi.object({
        id: Joi.string().trim().regex(/^[0-9a-zA-Z]+$/).required(),
        filename: Joi.string().trim().regex(/^.+\.(jpg|jpeg|png)$/).required(),
      })
    ),

    // controller
    async (req, res) => {
      const {
        id,
        filename,
      } = req.params;

      // find file
      const file = await File.findById(id);
      if (!file) {
        return res.status(403).send({message: 'File not existed'});
      }

      // transform file to stream
      res.setHeader("content-type", file.metadata.type);
      const raw = fs.createReadStream(file.url);
      raw.on('error', () => {});
      return raw.pipe(res);
    }
  );

  return router;
}
