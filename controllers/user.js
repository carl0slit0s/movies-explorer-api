const User = require('../models/user');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

const getUserData = (req, res, next) => {
  User.findById(req.user.id)
    .orFail(() => {
      throw new NotFoundError('NotFound');
    })
    .then((user) => res.send({ name: user.name, email: user.email }))
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('NotFound');
    })
    .then((user) => res.send(user.name, user.email))
    .catch(next);
};

module.exports = { getUserData, updateUserData };
