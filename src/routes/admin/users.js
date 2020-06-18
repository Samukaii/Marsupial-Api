const express = require('express');
const router = express.Router();
const auth = require('../../app/middlewares/auth');
const {index, show, update, destroy} = require('../../app/controllers/userController');

router.use(auth);

router.get('/', index);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
