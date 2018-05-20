const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV === 'development';
const webpack = require('webpack');
const manifest = require('./vendor-manifest.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  isDev,
  mode: isDev ? 'development' : 'production',
  publicPath: isDev ? '/' : '/public',
  rootPath: path.join(__dirname, 'src'),
  distPath: path.join(__dirname, 'dist'),
  port: 9000,
  devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',

  development: {
    rules: [
      {
        test: /\.(js|jsx)/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(s?css)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1, sourceMap: true }
          },
          {
            loader: 'sass-loader',
            options: { includePaths: [/scss/], sourceMap: true }
          }
        ]
      }
    ],
    plugins: [
        new webpack.DllReferencePlugin({
          manifest,
          context: __dirname
        })
    ]
  },

  production: {
    rules: [
      {
        test: /\.s?css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoader: 2,
                sourceMap: false,
                minimize: true,
                module: true,
                localIndentName: '[name]__[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('autoprefixer')({ browsers: 'ie >= 9' })]
              }
            },
            {
              loader: 'sass-loader',
              options: { includePaths: [/scss/], sourceMap: false }
            }
          ]
        })
      }
    ],
    plugin: [
        new ExtractTextPlugin({ filename: 'static/css/[name].[contenthash:8].css' })
    ]
  }
};
