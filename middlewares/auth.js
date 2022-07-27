const jwt = require('jsonwebtoken');
const { authError } = require('./errors');

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    authError();
  }
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, 'very_secret');
    req.user = payload;
    next();
  } catch (err) {
    authError();
  }
};

module.exports = { isAuthorized };
