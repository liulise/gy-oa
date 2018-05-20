const path = require('path');
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const isDev = NODE_ENV === 'development';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
        test: /\.(s?css)$/,
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
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin() //用户名替代id
    ]
  },

  production: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoader: 2,
              sourceMap: false,
              minimize: true,
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
      }
    ],
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[id].[contenthash:8].css'
      })
    ]
  }
};
