const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devBuild = process.env.NODE_ENV !== 'production';
const mode = devBuild ? 'development' : 'production';

module.exports = (config = 'client', extraOptions = {}) =>
  Object.assign(
    {
      entry: null,
      output: null,
      mode: mode,
      devtool: config === 'server' ? false : devBuild ? 'eval' : 'source-map',
      resolve: {
        extensions: [
          '.webpack.js',
          '.web.js',
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.scss',
          '.css',
          'config.js',
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, '..', 'src', 'scenes', 'index.html'),
          inject: 'body',
        }),
        new MiniCssExtractPlugin({
          filename:
            config === 'server'
              ? 'server.css'
              : devBuild
              ? '[name].css'
              : '[name]-[chunkhash].css',
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(mode),
          },
        }),
      ]
        .concat(
          config === 'server'
            ? [
                new webpack.NormalModuleReplacementPlugin(
                  /\/reg-client\.js/,
                  './reg-server.js'
                ),
              ]
            : [
                new WebpackManifestPlugin({
                  fileName: `manifest-${
                    config === 'admin' ? 'asc' : 'react'
                  }.json`,
                }),
              ].concat(
                devBuild
                  ? [new webpack.HotModuleReplacementPlugin()]
                  : [
                      new CompressionPlugin({
                        test: /\.(js|css)/,
                      }),
                    ]
              )
        )
        .filter((a) => a),

      optimization: {
        moduleIds: 'named',
        splitChunks: false,
        minimize: !devBuild,
        minimizer: [
          new TerserPlugin({
            parallel: true,
          }),
        ],
        concatenateModules: false,
      },
      module: {
        rules: [
          {
            test: /\.[jt]sx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: { cacheDirectory: true },
          },
          { test: /\.png$/, use: 'url-loader?limit=10000&mimetype=image/png' },
          { test: /\.jpg$/, use: 'url-loader?limit=10000&mimetype=image/jpeg' },
          {
            test: /\.webp$/,
            use: 'url-loader?limit=10000&mimetype=image/webp',
          },
          { test: /\.gif$/, use: 'url-loader?limit=10000&mimetype=image/gif' },
          {
            test: /\.svg$/,
            use: 'url-loader?limit=10000&mimetype=image/svg+xml',
          },
          {
            test: /\.s?css$/,
            use: [
              devBuild && config !== 'server'
                ? {
                    loader: 'style-loader',
                  }
                : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
              },
            ],
          },
        ],
      },
      stats: {
        children: true,
      },
    },
    extraOptions
  );
