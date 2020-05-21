const {register, authenticate} = require('../../app/controllers/authController.js');
const {forgotPassword, resetPassword} = require('../../app/controllers/authController.js');
const express = require('express');
const router = express.Router();

router.post('/register', register);
router.post('/authenticate', authenticate);
router.post('/forgot_password', forgotPassword);
router.post('/reset_password', resetPassword);

module.exports = app => {
  app.use('/auth', router);
};
