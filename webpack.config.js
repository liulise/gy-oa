const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// -----------------------------------------------------------

// out put
const output = {
  path: config.distPath,
  publicPath: config.publicPath,
  filename: `js/[name].${config.isDev ? '' : '[contenthash:8].'}js`,
  ...(config.isDev ? {} : { chunkFilename: '[id].[chunkhash].js' }),
};

// -----------------------------------------------------------

// common rules
const commonRules = [
  {
    test: /\.(js|jsx)/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  },
  {
    test: /\.(jpg|gif|png|jpeg)/,
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: `static/images/[name].${config.isDev ? '' : '[hash:8].'}[ext]`
    }
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
    loader: 'file-loader',
    options: { name: `static/fonts/[name].${config.isDev ? '' : '[hash:8].'}[ext]` }
  }
];

// -----------------------------------------------------------

// common plugins
const commonPlugins = [
    new CleanWebpackPlugin([config.distPath]),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(config.rootPath, 'index.html'),
    }),

    new CopyWebpackPlugin([{
      from: path.join(config.rootPath, 'static'),
      to: path.join(config.distPath, 'static'),
    }]),

    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(config.mode),
    }),
];

// -----------------------------------------------------------

// exports
module.exports = {
  mode: config.mode,
  entry: path.join(config.rootPath, 'index.jsx'),
  output,
  module: { rules: [...commonRules, ...config[config.mode].rules] },
  plugins: [...commonPlugins, ...config[config.mode].plugins],
  resolve: {
    alias: { src: config.rootPath },
    modules: [config.rootPath, 'node_modules']
  },
  devtool: config.devtool,

  ...(config.isDev ? {
    devServer: {
      hot: true,
      open: true,
      inline: true,
      compress: true,
      host: 'localhost',
      port: config.port,
      contentBase: path.resolve(__dirname, 'dist'),
    }
  } : {})
};
