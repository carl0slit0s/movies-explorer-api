const router = require('express').Router();

const { getMovies, deleteMovie, addMovie } = require('../controllers/movie');

router.get('/', getMovies);

router.post('/', addMovie);

router.delete('/:movieId', deleteMovie);

module.exports = router;
