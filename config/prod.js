const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HTML_FILE = path.resolve(__dirname, './../src/client/index.html')

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
  //   optimization: {
  //     minimize: false
  // },
    target:'node',
    entry: {
      server: configDirs.SERVER_DIR,
      app: configDirs.APP_DIR,
    },
  
    output: {
      path: path.resolve(__dirname, './../dist'),
      filename: '[name].bundle.js',
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: HTML_FILE, to: "." },
        ],
      }),
      new CleanWebpackPlugin(),
    ],
  }
}

module.exports = buildConfig