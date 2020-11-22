const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')

const HTML_TEMPLATE = path.resolve(__dirname, './../src/client/index.html')

function buildConfig(configDirs) {
  return {
    watch: true,
    devServer: {
      historyApiFallback: true,
      contentBase: configDirs.BUILD_DIR,
      watchContentBase: true,
      open: true,
      compress: true,
      hot: true,
      port: 8080,
    },
  
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
  
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  
    entry: {
      app: configDirs.APP_DIR,
    },
  
    output: {
      path: configDirs.BUILD_DIR,
      filename: '[name].bundle.js',
    },
  
    plugins: [
      new HtmlWebpackPlugin({
        template: HTML_TEMPLATE,
        filename: 'index.html',
      }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  
  }
}

module.exports = buildConfig