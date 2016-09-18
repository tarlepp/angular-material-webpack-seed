'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  //commonsChunk: true,
  longTermCaching: true,
  separateStylesheet: true,
  minimize: true,
  devtool: false,
  path: 'dist',
  publicPath: '/dist',
  plugins: [
    new CleanWebpackPlugin(
        ['dist'],
        {
          root: path.join(__dirname, '..'),
          verbose: true,
          exclude: ['.gitignore']
        }
    ),
  ]
});

module.exports = config;
