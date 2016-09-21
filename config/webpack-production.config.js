'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  longTermCaching: true,
  separateStylesheet: true,
  minimize: true,
  devtool: false,
  path: 'dist',
  publicPath: '/dist',
  baseHref: '/dist/',
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
