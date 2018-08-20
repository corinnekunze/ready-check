'use strict';

var routes = require('express').Router();
require('./group.routes.js')(routes);
var path = require('path');

routes.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '../../views/index.html'));
});

module.exports = routes;