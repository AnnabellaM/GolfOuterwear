const express = require('express');
const mongoose = require('mongoose');
const {File} = require("../../models/file");
const appRoot = require('app-root-path');
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.post(
    // path
    '/upload',

    // verify token
    verifyToken(['admin', 'customer']),

    // controller
    async (req, res) => {
      const uploadFile = req.files.file;

      const fileId = new mongoose.Types.ObjectId()
      const uploadPath = `${appRoot}/uploaded/${fileId}/${uploadFile.name}`;

      try {
        // move file
        await uploadFile.mv(uploadPath);
      } catch (err) {
        return res.status(500).send({
          message: 'File upload error'
        });
      }

      // save file info into db
      const file = File.build({
        id: fileId,
        filename: uploadFile.name,
        metadata: {
          size: uploadFile.size,
          type: uploadFile.mimetype,
        },
        url: uploadPath
      });
      await file.save()

      return res.send({
        ...file.toJSON(),
        url: `/${fileId}/${uploadFile.name}`
      })
    }
  );

  return router
}
