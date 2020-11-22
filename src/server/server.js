;

const express = require('express')
const app = express()
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static('dist'))

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});



// app.get('/', (req, res) => {
//   console.log(' ' + __dirname)
//   app.use(express.static(__dirname + '/'))
// })

app.listen(app.get('port'), () => {
  console.log(`Running...`)
})

