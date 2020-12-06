
const express = require('express');
const app = express()
var path = require('path');
const db = require('./database.js')

const port = process.env.PORT || 5000

app.use(express.static('dist'))

app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})


app.get('/notebook', (_req, res) => {
  console.log('/notebook')
  res.sendFile(path.join(__dirname, './../index.html'));
});


app.get('/check', function (req, res) {
  console.log('/check')
  res.send('The server is up..')
})

app.get('/add', function (req, res) {
  console.log('/add')
  db.connect()
})

// console.log("get value of", process.env.test)