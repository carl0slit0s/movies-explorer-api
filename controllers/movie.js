const Movie = require('../models/movie');
const { noRightsError } = require('../middlewares/errors');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ movies }))
    .cath(next);
};

const addMovie = (req, res, next) => {
  const movieData = req.body;

  Movie.create(movieData)
    .then(() => res.status(201).send(movieData))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.body;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError('NotFound');
    })
    .then((movie) => {
      if (req.user.id !== movie.owner._id.toString()) {
        return next(noRightsError());
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then(() => res.send({ message: 'фильм удалён' }))
    .catch(next);
};

module.exports = { getMovies, deleteMovie, addMovie };
