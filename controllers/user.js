const User = require('../models/user');
const { notFoundPageErorr, alreadyExistsError, validError } = require('../middlewares/errors');

// class NotFoundError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'NotFoundError';
//     this.statusCode = 404;
//   }
// }

const getUserData = (req, res, next) => {
  User.findById(req.user.id)
    .orFail(() => {
      notFoundPageErorr();
    })
    .then((user) => res.send({ name: user.name, email: user.email, id: user._id }))
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
      notFoundPageErorr();
    })
    .then((user) => res.send({ name: user.name, email: user.email }))
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

module.exports = { getUserData, updateUserData };
