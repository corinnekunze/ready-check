const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const routes = require('./routes/router');

global.baseDir = __dirname;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static('dist'));

const webPort = config.get('port') || 8080;

const dbUrl = 'mongodb://localhost:27017/ready-check';
// const dbUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}
//               @ready-check-bemau.mongodb.net/test?retryWrites=true`;
mongoose.connect(dbUrl, { useNewUrlParser: true })
  .then(() => {
    app.listen(webPort, () => {
      console.log(`App listening on port ${webPort}.`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = app;
