const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes/router');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

const webPort = 8080;

require('./database');

app.listen(webPort, () => {
  console.log(`App listening on port ${webPort}.`);
});


module.exports = app;
