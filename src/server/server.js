const express = require('express')
const app = express()
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static('dist'))

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
  // res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Running...`)
})

console.log("get value of", process.env.test)
