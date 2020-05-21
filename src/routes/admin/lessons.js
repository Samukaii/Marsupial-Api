const express = require('express');
const authMiddleware = require('../../app/middlewares/auth');
const {index, show, store, update, destroy} = require('../../app/controllers/lessonController');

const router = express.Router();

router.use(authMiddleware);

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
