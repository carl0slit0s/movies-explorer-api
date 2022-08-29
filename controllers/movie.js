const Movie = require('../models/movie');
const { noRightsError, notFoundPageErorr } = require('../middlewares/errors');
const { alreadyExistsIdError, validError } = require('../middlewares/errors');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const movieData = req.body;
  const owner = req.user.id;
  Movie.create({ ...movieData, owner })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(alreadyExistsIdError());
      }
      if (err.name === 'ValidationError') {
        return next(validError());
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(() => {
      throw notFoundPageErorr();
    })
    .then((movie) => {
      if (req.user.id !== movie.owner._id.toString()) {
        return next(noRightsError());
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then(() => res.send({ message: 'фильм удалён' }))
    .catch(() => next());
};

module.exports = { getMovies, deleteMovie, addMovie };
