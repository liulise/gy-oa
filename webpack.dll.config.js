var path = require("path");
var webpack = require("webpack");

module.exports = {
  mode: 'development',

  entry: {
    vendor: ['babel-polyfill', 'react', 'react-dom']
  },

  output: {
    path: path.join(__dirname, 'src/static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library'
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
};
