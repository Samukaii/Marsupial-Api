const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/sections', require('./sections'));
router.use('/lessons', require('./lessons'));
router.use('/videos', require('./videos'));
module.exports = app => {
    app.use('/admin', router);
};
