const express = require('express');
const router = express.Router();
const auth = require('../../app/middlewares/auth');
const {index, show, store, update, destroy} = require('../../app/controllers/knowledgeController');

router.use(auth);

router.get('/', index);
router.get('/:id', show);
router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
