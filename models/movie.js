const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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
    valodate: (val) => /(http|https):\/\/([\w.]+\/?)\S*/.test(val),
    message: () => 'нреккоректнгая ссылка',
  },
  trailerLink: {
    type: String,
    required: true,
    validator: (val) => /(http|https):\/\/([\w.]+\/?)\S*/.test(val),
    message: () => 'нреккоректнгая ссылка',
  },
  thumbnail: {
    type: String,
    required: true,
    validator: (val) => /(http|https):\/\/([\w.]+\/?)\S*/.test(val),
    message: () => 'нреккоректнгая ссылка',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movie',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validator: (val) => /[\w\s]/g.test(val),
    message: () => 'нреккоректнгая ссылка',
  },
  nameEN: {
    type: String,
    required: true,
    validator: (val) => /[а-яА-Я\d\s]/g.test(val),
    message: () => 'нреккоректнгая ссылка',
  },
});

module.exports = mongoose.model('movie', movieSchema);
