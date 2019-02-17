module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'airbnb-base'
  ],
  'parserOptions': {
    'ecmaVersion': 7,
    'ecmaFeatures': {
      'jsx': true,
      'experimentalObjectRestSpread': true,
      'modules': true,
      'arrowFunctions': true,
      'templateStrings': true
    }
  },
  'env': {
    'browser': true,
    'node': true,
    'mocha': true
  },
  'rules': {
    'no-console': 0,
    'comma-dangle': 0
  }
};
