const router = require('express').Router();
const path = require('path');

router.use('/api/groups', require('./group.routes.js'));

router.get('/', (request, response) => {
  response.sendFile(path.join(global.baseDir, '../../views/index.html'));
});

module.exports = router;
