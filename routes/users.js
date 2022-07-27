const router = require('express').Router();

const {
  getUserData,
  updateUserData,
} = require('../controllers/user');

router.get('/me', getUserData);

router.patch('/me', updateUserData);

module.exports = router;
