const path = require('path');
const config = require('./webpack.config');

module.exports = config('server', {
  entry: ['./src/scenes/index.js'],
  output: {
    filename: 'server-bundle.js',
    path: path.join(__dirname, '..', 'public', 'assets', 'bundles'),
  },
});
