const config = require('config');

const webPort = config.get('port') || 8080;

module.exports = webPort;
