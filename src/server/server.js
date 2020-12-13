
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./database')

const app = express()
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Running on port: ${port}`)
})


const path = require('path');
app.get('/notebook', (_req, res) => {
  console.log('/notebook')
  res.sendFile(path.join(__dirname, './../index.html'));
});

app.get('/check', function (req, res) {
  console.log('/check')
  res.send('The server is up..')
})

app.post('/add', function (req, res) {
  const body = req.body
  console.log('/add', req.body)
  db.insertNote(body)
  res.sendStatus(200)
})

app.get('/getNotesByUsername', async function (req, res) {
  console.log('/getNotesByUsername')
  const username = req.query.username
  const response = await db.retrieveNotesByUsername(username)
  console.log("--> ",response)
  res.send(response)
})

app.delete('/deleteNotesByUsername', async function (req, res) {
  const username = req.body.username
  console.log('/deleteNotesByUsername', username)
  const dbResponse = await db.deleteNotesByUsername(username)
  res.json(dbResponse)
})