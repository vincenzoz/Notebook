const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const db = require('./database')

const app = express()
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT || 5000
app.listen(port, () => {
})

app.get('/notebook', (_req, res) => {
  res.sendFile(path.join(__dirname, './../index.html'))
})

app.get('/check', (req, res) => {
  res.send('The server is up..')
})

app.post('/add', (req, res) => {
  const { body } = req
  db.insertNote(body)
  res.sendStatus(200)
})

app.get('/getNotesByUsername', async (req, res) => {
  const { username } = req.query
  const response = await db.retrieveNotesByUsername(username)
  res.send(response)
})

app.delete('/deleteNotesByUsername', async (req, res) => {
  const { username } = req.body
  const dbResponse = await db.deleteNotesByUsername(username)
  res.json(dbResponse)
})
