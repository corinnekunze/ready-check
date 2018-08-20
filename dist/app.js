'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var routes = require('./routes/router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

var webPort = 8080;

require('./database');

app.listen(webPort, function () {
  console.log('App listening on port ' + webPort + '.');
});

module.exports = app;