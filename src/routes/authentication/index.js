const express = require('express');
const router = express.Router();
const {register, login} = require('../../app/controllers/userController');

router.post('/register', register);
router.post('/login', login);

module.exports = app => {
  app.use('/auth', router);
};
