const router = require('express').Router();

const { login, register } = require('../controllers/auth');
const { userCreatValidation, userInValidatyion } = require('../middlewares/validate');

router.post('/signup', userCreatValidation, register);

router.post('/signin', userInValidatyion, login);

module.exports = router;
