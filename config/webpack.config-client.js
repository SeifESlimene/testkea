const path = require('path');
const config = require('./webpack.config');
const devBuild = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3500;

module.exports = config('client', {
  entry: {
    vendor: [
      devBuild ? 'webpack-dev-server/client?http://0.0.0.0:' + port : null,
      devBuild ? 'webpack/hot/only-dev-server' : null,
      'react',
      'react-dom',
      'kea',
      'redux',
      'react-redux',
      './src/scenes/index.js',
      './src/assets/stylesheets/webpack/index.scss',
    ].filter((a) => a),
  },
  output: Object.assign(
    {
      filename: devBuild ? '[name].js' : '[name]-[chunkhash].js',
      chunkFilename: devBuild ? '[name].js' : '[name]-[chunkhash].js',
    },
    devBuild
      ? {
          publicPath: `http://localhost:${port}/`,
        }
      : {
          publicPath: '/assets/bundles/',
        }
  ),
});
