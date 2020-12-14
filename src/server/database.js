
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_URL

const client = new MongoClient(uri, {useUnifiedTopology: true});
db = client.connect();
const noteCollection = () => client.db('notebook').collection('notes')

async function insertNote(noteRequest) {
  await noteCollection().updateOne({username: noteRequest.username}, {$set: noteRequest}, { upsert : true })
    .catch((error) => {
      console.error(error)
    });
}
  
async function retrieveNotesByUsername(username) {
  return await noteCollection().findOne({username: username})
    .then((result)=> {
      return result;
  }).catch((error)=> {
    console.error(error)
  })
}
  
async function deleteNotesByUsername(username) {
  return await noteCollection().deleteOne({username: username})
  .then((result)=> {
    return result.deletedCount;
  }).catch((error)=> {
    console.error(error)
  });
}

module.exports = { insertNote, retrieveNotesByUsername, deleteNotesByUsername }