const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
  name: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('Group', GroupSchema);
