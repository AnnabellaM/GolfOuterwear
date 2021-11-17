const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = () => {
  return async (req, res, next) => {
    const authorization = req.header('Authorization');
    const [type, token] = authorization.split(' ');
    try {
      req.auth = jwt.verify(token, config.jwt.secret);
      return await next();
    } catch (err) {
      return res.status(401).send({message: 'Unauthorized'});
    }
  }
}
