'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const makeWebpackConfig = require('./make-webpack-config');

const config = makeWebpackConfig({
  devtool: 'source-map',
  separateStylesheet: true,
  debug: false,
  plugins: [
    new CleanWebpackPlugin(
        ['public', 'build'],
        {
          root: path.join(__dirname, '..'),
          verbose: true,
          exclude: ['.gitignore']
        }
    ),
  ]
});

module.exports = config;
