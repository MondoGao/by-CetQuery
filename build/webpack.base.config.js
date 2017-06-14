const { resolve } = require('path')
const Webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: resolve(__dirname, '../'),
  entry: {
    index: './src/index.js',
    vendor: [
      'react',
      'react-dom'
    ]
  },
  output: {
    filename: 'scripts/[name].[hash].js',
    path: resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpg|png|gif|ico|svg)/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'assets/[name].[ext]?[hash:7]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'assets': resolve(__dirname, '../src/assets'),
      'components': resolve(__dirname, '../src/components'),
      'styles': resolve(__dirname, '../src/styles'),
      'scripts': resolve(__dirname, '../src/scripts'),
      'sources': resolve(__dirname, '../src/sources')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
}
