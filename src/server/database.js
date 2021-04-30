const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_DB_URL

const client = new MongoClient(uri, { useUnifiedTopology: true })
client.connect()

const userCollection = () => client.db('notebook').collection('users')

async function retrieveUser(loginRequest) {
  const { username, password } = loginRequest
  return userCollection().findOne(
    { username, password },
  )
    .then((result) => result)
    .catch((error) => {
      console.error(error)
    })
}

async function updateNotes(noteRequest) {
  await userCollection()
    .updateOne(
      { username: noteRequest.username },
      { $set: { notes: noteRequest.notes } },
      { upsert: true },
    )
    .catch((error) => {
      console.error(error)
    })
}

async function retrieveNotesForUsername(username) {
  return userCollection().findOne({ username })
    .then((result) => result)
    .catch((error) => {
      console.error(error)
    })
}

async function deleteNotesForUsername(username) {
  return userCollection()
    .updateOne(
      { username },
      { $set: { notes: [] } },
    )
    .then((result) => result.deletedCount)
    .catch((error) => {
      console.error(error)
    })
}

module.exports = {
  retrieveUser, updateNotes, retrieveNotesForUsername, deleteNotesForUsername 
}
