const express = require('express');
const adminSignInRouter = require('./adminSignIn');
const getAdminInfoRouter = require('./getAdminInfo');

module.exports = () => {
  const router = express.Router();

  // admin sign in
  router.use(adminSignInRouter());

  // get my info
  router.use(getAdminInfoRouter());

  return router;
}
