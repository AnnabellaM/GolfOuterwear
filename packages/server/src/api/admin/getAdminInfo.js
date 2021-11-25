const express = require('express');
const {Admin} = require('../../models/admin');
const verifyToken = require('../../middlewares/verifyToken');

module.exports = () => {
  const router = express.Router();

  router.get(
    // path
    '/me',

    // verify token
    verifyToken(['admin']),

    // controller
    async (req, res) => {
      const { adminId } = req.auth;

      // find customer
      const admin = await Admin.findOne({ _id: adminId });

      // cannot find admin, response error
      if (!admin) {
        res.status(403).send({
          message: 'Admin not existed'
        });
        return;
      }

      const adminObj = admin.toJSON();
      delete adminObj.password;

      // response admin info
      res.send(adminObj);
    }
  );

  return router;
}
