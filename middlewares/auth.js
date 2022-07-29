const jwt = require('jsonwebtoken');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const { authError } = require('./errors');

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    authError();
  }
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'very_secret');
    req.user = payload;
    next();
  } catch (err) {
    authError();
  }
};

module.exports = { isAuthorized };
