'use strict';

const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
  devtool: 'inline-source-map',
  debug: true,
});

module.exports = config;
