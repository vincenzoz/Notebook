const path = require('path')

module.exports = env => {
  console.log('environment: ', env);

  var BUILD_DIR = path.resolve(__dirname, './dist');
  var APP_DIR = path.resolve(__dirname, './src/client/App.tsx');
  var SERVER_DIR = path.resolve(__dirname, './src/server/server.js')

  const configDirs = {
    BUILD_DIR: BUILD_DIR,
    APP_DIR: APP_DIR,
    SERVER_DIR: SERVER_DIR,
  }

  if (env.dev || env.prod) {
    const config = env.dev ? 'dev' : 'prod'
      return require('./config/' + config + '.js')(configDirs)
  } else {
      console.log("Invalid parameter. Use 'dev' or 'prod'")
  }
}