const router = require('express').Router();

const { isAuthorized } = require('../middlewares/auth');
const {
  movieCreatValidation,
  movieDeleteValidation,
  userUpdateValidatyion,
  userCreatValidation,
  userInValidatyion,
} = require('../middlewares/validate');

const { getMovies, deleteMovie, addMovie } = require('../controllers/movie');
const { login, register } = require('../controllers/auth');
const { getUserData, updateUserData } = require('../controllers/user');

router.post('/signup', userCreatValidation, register);
router.post('/signin', userInValidatyion, login);

router.use(isAuthorized);

router.get('/movies', getMovies);

router.post('/movies', movieCreatValidation, addMovie);

router.delete('/movies/:movieId', movieDeleteValidation, deleteMovie);

router.get('/users/me', getUserData);

router.patch('/users/me', userUpdateValidatyion, updateUserData);

module.exports = router;
