const router = require('express').Router();
const groups = require('../controllers/group.controller.js');

router.post('/', groups.create);

router.get('/', groups.findAll);

router.get('/:groupId', groups.findOne);

router.put('/:groupId', groups.update);

router.delete('/:groupId', groups.delete);

module.exports = router;
