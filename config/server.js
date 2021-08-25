var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config-client');
// return a Compiler instance
const compiler = webpack(webpackConfig);
const devServerOptions = {
  open: true,
  hot: true,
};
const devServer = new WebpackDevServer(devServerOptions, compiler);

const port = process.env.PORT || 3500;

devServer.listen(port, '0.0.0.0', function (err) {
  if (err) console.error(err);
  console.log('=> 🔥 Webpack Development Server Is Running On Port ' + port);
});
