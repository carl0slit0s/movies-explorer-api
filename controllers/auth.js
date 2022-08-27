const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const { NODE_ENV, JWT_SECRET_ENV } = process.env;

const User = require('../models/user');
const { invalidData, validError, alreadyExistsError } = require('../middlewares/errors');

const login = (req, res, next) => {
  const { email, password } = req.body;
  try {
    User.findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          invalidData();
        }
        return Promise.all([user, bcrypt.compare(password, user.password)]);
      })
      .then(([user, isPasswordCorrect]) => {
        if (!isPasswordCorrect) {
          invalidData();
        }
        const token = jwt.sign(
          { id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET_ENV : JWT_SECRET,
          { expiresIn: '7d' },
        );
        res.send({ token });
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

const register = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(alreadyExistsError());
      }
      if (err.name === 'ValidationError') {
        return next(validError());
      }
      return next(err);
    });
};

module.exports = { register, login };
