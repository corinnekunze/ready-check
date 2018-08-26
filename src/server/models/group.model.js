const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
  name: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Group', GroupSchema);
