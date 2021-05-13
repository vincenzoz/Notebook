const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

function buildConfig(conf) {
  return {
    module: {
      rules: [
        conf.loaders.tsLoader,
        conf.loaders.styleLoader,
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      mainFields: ['browser', 'module', 'main'],
    },
    target: 'node',
    entry: {
      app: conf.dirs.APP_DIR,
    },
    output: {
      path: path.resolve(__dirname, './../dist'),
      filename: 'bundle.js',
    },
    plugins: [
      conf.plugins.htmlPlugin,
      conf.plugins.copyPlugin,
      new webpack.DefinePlugin({
        ENV: JSON.stringify('prod'),
        SERVER_URL: JSON.stringify(''),
      }),
      new CleanWebpackPlugin(),
    ],
  }
}

module.exports = buildConfig
