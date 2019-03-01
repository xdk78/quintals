const webpack = require('webpack')
const merge = require('webpack-merge')
const { resolve } = require('path')
const baseConfig = require('./webpack.config.base')

const config = merge.smart(baseConfig, {
  devtool: 'source-map',
  mode: 'production',
  output: {
    path: resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(png|gif|jpg|woff2|ttf|svg)$/,
        use: ['url-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ]
})

const appConfig = merge.smart(config, {
  target: 'electron-renderer',

  entry: {
    app: ['./src/renderer/app']
  }
})

module.exports = [appConfig]
