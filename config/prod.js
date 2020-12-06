const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function buildConfig(configDirs) {

  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
      ],
    },
  
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    target:'node',
    entry: {
      app: configDirs.APP_DIR,
    },
  
    output: {
      path: path.resolve(__dirname, './../dist'),
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: configDirs.HTML_TEMPLATE,
        filename: 'index.html',
      }),
      new CopyPlugin({
        patterns: [
          { from: configDirs.SERVER_FOLDER, to: "./server" },
        ],
      }),
      new CleanWebpackPlugin(),
    ],
  }
}

module.exports = buildConfig