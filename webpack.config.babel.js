const path = require('path');
const nodeExternals = require('webpack-node-externals');

const config = {
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map';
  config.watch = true;
}

const clientConfig = {
  ...config,
  name: 'client',
  target: 'web',

  output: {
    ...config.output,
    path: path.join(__dirname, 'public', 'assets'),
    publicPath: '/assets/'
  },

  entry: {
    client: ['./src/client/index.js']
  },

  resolve: { extensions: ['.jsx', '.js', '.json'] }
};

const serverConfig = {
  ...config,
  name: 'server',
  target: 'node',

  entry: {
    server: ['./src/server/index.js']
  },

  output: {
    ...config.output,
    path: path.resolve(__dirname, './dist'),
  },

  externals: [nodeExternals()]
};

module.exports = [clientConfig, serverConfig];
