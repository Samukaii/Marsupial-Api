const express = require('express');
const router = express.Router();
const {register, login} = require('../../app/controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = app => {
    app.use('/auth', router);
};
