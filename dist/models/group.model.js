'use strict';

var mongoose = require('mongoose');

var GroupSchema = mongoose.Schema({
  name: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Group', GroupSchema);