﻿var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: "source-map",
  entry: './js/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: [/node_modules/],
      query: {
        presets: ['stage-3', 'react'],
        plugins: ['transform-es2015-modules-commonjs']
      }
    },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=2000' }
    ]
  }
}
