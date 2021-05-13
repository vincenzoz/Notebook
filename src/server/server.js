const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const db = require('./database')

const app = express()
app.use(express.static('dist'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const corsOptions = {
  exposedHeaders: 'token',
}
app.use(cors(corsOptions))

const secret = process.env.SECRET

const port = process.env.PORT || 5000
app.listen(port, () => {
})

const authenticateToken = function (req, res, next) {
  console.log('url: ', req.originalUrl)
  // TODO: Handle this requests filter differently
  if ((req.method === 'POST' && req.originalUrl === '/login') || (req.method === 'GET' && req.originalUrl === '/favicon.ico')) {
    console.log('call next...')
    next()
  } else {
    console.log('verify token..')
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) res.sendStatus(401)

    jwt.verify(token, secret, (err, ok) => {
      if (err) res.sendStatus(403)
      if (ok) next()
    })
  }
}

app.use(authenticateToken)

app.post('/login', async (req, res) => {
  const response = await db.retrieveUser(req.body)
  if (response) {
    const token = jwt.sign({ user: response.username }, secret, { expiresIn: 1800 })
    res.header('token', token)
    res.send(response)
  } else {
    res.sendStatus(403)
  }
})

app.post('/add', (req, res) => {
  const { body } = req
  db.updateNotes(body)
  res.sendStatus(200)
})

app.get('/getNotesForUser', async (req, res) => {
  const { username } = req.query
  const response = await db.retrieveNotesForUsername(username)
  res.send(response)
})

app.put('/deleteNotesForUser', async (req, res) => {
  const { username } = req.body
  const dbResponse = await db.deleteNotesForUsername(username)
  res.json(dbResponse)
})
