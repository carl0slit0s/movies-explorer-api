const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET } = require('../config/config');

const { NODE_ENV, JWT_SECRET_ENV } = process.env;
const { authError } = require('./errors');

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    authError();
  }
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_ENV : JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    authError();
  }
};

module.exports = { isAuthorized };
