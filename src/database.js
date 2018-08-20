const mongoose = require('mongoose');

const dbConfig = 'mongodb://localhost:27017/ready-check';

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Successful connection!');
}).catch((error) => {
  console.log(`Could not connect to database: ${error}`);
  process.exit();
});

const database = mongoose.connection;

module.exports = database;
