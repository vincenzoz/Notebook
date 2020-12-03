const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

function buildConfig(configDirs) {
  return {
    watch: true,
    devtool: 'eval-source-map',
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
    optimization: {
      // splitChunks: {
      //   cacheGroups: {
      //     commons: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name: 'vendors',
      //       chunks: 'all'
      //     }
      //   }
      // },
      minimize: true
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    entry: {
      app: configDirs.APP_DIR,
    },
  
    output: {
      path: configDirs.BUILD_DIR,
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
    ],
  
  }
}

module.exports = buildConfig