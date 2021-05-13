const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = (env) => {
  console.log('environment: ', env)

  const BUILD_DIR = path.resolve(__dirname, './dist')
  const APP_DIR = path.resolve(__dirname, './src/client/App.tsx')
  const SERVER_DIR = path.resolve(__dirname, './src/server/server.js')
  const HTML_TEMPLATE = path.resolve(__dirname, './src/client/public/index.html')
  const SERVER_FOLDER = path.resolve(__dirname, './src/server')

  const configDirs = {
    BUILD_DIR,
    APP_DIR,
    SERVER_DIR,
    HTML_TEMPLATE,
    SERVER_FOLDER,

  }

  const htmlPlugin = new HtmlWebpackPlugin({
    template: configDirs.HTML_TEMPLATE,
    filename: 'index.html',
  })

  const copyPlugin = new CopyPlugin({
    patterns: [
      { from: configDirs.SERVER_FOLDER, to: './server' },
    ],
  })

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }
  const styleLoader = {
    test: /\.s[ac]ss$/i,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  }

  const conf = {
    plugins: {
      htmlPlugin,
      copyPlugin,
    },
    dirs: {
      BUILD_DIR,
      APP_DIR,
      SERVER_DIR,
      HTML_TEMPLATE,
      SERVER_FOLDER,
    },
    loaders: {
      tsLoader,
      styleLoader,
    },
  }

  if (env.dev || env.prod) {
    const config = env.dev ? 'dev' : 'prod'
    return require(`./config/${config}.js`)(conf)
  }
  // eslint-disable-next-line no-throw-literal
  throw 'Invalid parameter. Use `dev` or `prod`'
}
