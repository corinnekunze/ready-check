const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  output: {
    publicPath: '/assets/',
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map';
}

const clientConfig = {
  ...config,
  name: 'client',
  target: 'web',

  entry: {
    client: ['./src/client/index.js']
  }
};

const serverConfig = {
  ...config,
  name: 'server',
  target: 'node',

  entry: {
    server: ['./src/server/index.js']
  },

  externals: [nodeExternals()]
};

module.exports = [clientConfig, serverConfig];
