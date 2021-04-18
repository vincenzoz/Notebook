const { MongoClient } = require('mongodb')

const uri = process.env.MONGO_DB_URL

const client = new MongoClient(uri, { useUnifiedTopology: true })
client.connect()
const noteCollection = () => client.db('notebook').collection('notes')

async function insertNote(noteRequest) {
  await noteCollection()
    .updateOne({ username: noteRequest.username }, { $set: noteRequest }, { upsert: true })
    .catch((error) => {
      console.error(error)
    })
}

async function retrieveNotesByUsername(username) {
  return noteCollection().findOne({ username })
    .then((result) => result)
    .catch((error) => {
      console.error(error)
    })
}

async function deleteNotesByUsername(username) {
  return noteCollection().deleteOne({ username })
    .then((result) => result.deletedCount)
    .catch((error) => {
      console.error(error)
    })
}

module.exports = { insertNote, retrieveNotesByUsername, deleteNotesByUsername }
