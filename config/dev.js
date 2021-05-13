const webpack = require('webpack')

function buildConfig(conf) {
  return {
    watch: true,
    devtool: 'eval-source-map',
    module: {
      rules: [
        conf.loaders.tsLoader,
        conf.loaders.styleLoader,
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
      minimize: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    entry: {
      app: conf.dirs.APP_DIR,
    },
    output: {
      path: conf.dirs.BUILD_DIR,
      filename: 'bundle.js',
    },
    plugins: [
      conf.plugins.htmlPlugin,
      conf.plugins.copyPlugin,
      new webpack.DefinePlugin({
        ENV: JSON.stringify('dev'),
        SERVER_URL: JSON.stringify('http://localhost:5000'),
      }),
    ],
  }
}

module.exports = buildConfig
