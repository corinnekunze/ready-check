const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes/router');

global.__baseDir = __dirname;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static('dist'));

const webPort = config.get('port') || 8080;

require('./database')
  .then(
    app.listen(webPort, () => {
      console.log(`App listening on port ${webPort}.`);
    })
  )
  .catch(error => console.log(error));

module.exports = app;
