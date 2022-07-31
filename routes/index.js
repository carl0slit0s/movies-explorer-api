const router = require('express').Router();

const {
  movieCreatValidation,
  movieDeleteValidation,
  userUpdateValidatyion,
} = require('../middlewares/validate');

const { getMovies, deleteMovie, addMovie } = require('../controllers/movie');

const {
  getUserData,
  updateUserData,
} = require('../controllers/user');

router.get('/movies', getMovies);

router.post('/movies', movieCreatValidation, addMovie);

router.delete('/movies/:movieId', movieDeleteValidation, deleteMovie);

router.get('/users/me', getUserData);

router.patch('/users/me', userUpdateValidatyion, updateUserData);

module.exports = router;
