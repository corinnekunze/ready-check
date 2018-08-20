'use strict';

var groups = require('../controllers/group.controller.js');

module.exports = function (app) {
  app.post('/groups', groups.create);

  app.get('/groups', groups.findAll);

  app.get('/group/:groupId', groups.findOne);

  app.put('/group/:groupId', groups.update);

  app.delete('/group/:groupId', groups.delete);
};