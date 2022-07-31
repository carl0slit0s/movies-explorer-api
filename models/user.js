const moviesdb = require('mongoose');
const validator = require('validator');

const userSchema = new moviesdb.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (val) => validator.isEmail(val),
      message: 'некоректная почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = moviesdb.model('user', userSchema);
