const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (roles) => {
  return async (req, res, next) => {
    const authorization = req.header('Authorization');
    const [type, token] = authorization.split(' ');
    try {
      req.auth = jwt.verify(token, config.jwt.secret);
      const tokenRole = Object.keys(req.auth)[0].replace('Id', ''); // customerId => customer, adminId => admin
      if (!roles.includes(tokenRole)) {
        return res.status(401).send({message: 'Unauthorized'});
      }
      return await next();
    } catch (err) {
      return res.status(401).send({message: 'Unauthorized'});
    }
  }
}
