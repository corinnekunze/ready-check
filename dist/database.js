'use strict';

var mongoose = require('mongoose');

var dbConfig = 'mongodb://localhost:27017/ready-check';

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig, {
  useNewUrlParser: true
}).then(function () {
  console.log('Successful connection!');
}).catch(function (error) {
  console.log('Could not connect to database: ' + error);
  process.exit();
});

var database = mongoose.connection;

module.exports = database;