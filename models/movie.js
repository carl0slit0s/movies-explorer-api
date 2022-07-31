const moviesdb = require('mongoose');
const validator = require('validator');

const movieSchema = new moviesdb.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (val) => validator.isURL(val),
      message: 'не валидная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (val) => validator.isURL(val),
      message: 'не валидная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (val) => validator.isURL(val),
      message: 'не валидная ссылка',
    },
  },
  owner: {
    type: moviesdb.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (val) => /[\w\s]/g.test(val),
      message: 'не валидная ссылка',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (val) => /[а-яА-Я\d\s]/g.test(val),
      message: 'не валидная ссылка',
    },
  },
});

module.exports = moviesdb.model('movie', movieSchema);
