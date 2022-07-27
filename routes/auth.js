const router = require('express').Router();

const { login, register } = require('../controllers/auth');

router.post('/signup', register);
router.post('/signin', login);

module.exports = router;
