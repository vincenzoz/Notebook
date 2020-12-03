const path = require('path')

module.exports = env => {
  console.log('environment: ', env);

  const BUILD_DIR = path.resolve(__dirname, './dist');
  const APP_DIR = path.resolve(__dirname, './src/client/App.tsx');
  const SERVER_DIR = path.resolve(__dirname, './src/server/server.js')
  const HTML_TEMPLATE = path.resolve(__dirname, './src/client/index.html')
  const SERVER_FOLDER = path.resolve(__dirname, './src/server')

  const configDirs = {
    BUILD_DIR: BUILD_DIR,
    APP_DIR: APP_DIR,
    SERVER_DIR: SERVER_DIR,
    HTML_TEMPLATE: HTML_TEMPLATE,
    SERVER_FOLDER: SERVER_FOLDER

  }

  if (env.dev || env.prod) {
    const config = env.dev ? 'dev' : 'prod'
      return require('./config/' + config + '.js')(configDirs)
  } else {
      console.log("Invalid parameter. Use 'dev' or 'prod'")
  }
}