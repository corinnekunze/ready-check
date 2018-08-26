const routes = require('express').Router();
require('./group.routes.js')(routes);
const path = require('path');

routes.get('/', (request, response) => {
  response.sendFile(path.join(global.__baseDir, '../../views/index.html'));
});

module.exports = routes;
