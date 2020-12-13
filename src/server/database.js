
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_URL

  async function insertNote(noteRequest) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    await client.connect();
    const notesCollection = client.db('notebook').collection('notes');
    await notesCollection.updateOne({username: noteRequest.username}, {$set: noteRequest}, { upsert : true }).catch((error) => {
      console.error(error)
    });
    client.close();
  }
  
  async function retrieveNotesByUsername(username) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    await client.connect()
    const notesCollection = client.db('notebook').collection('notes');
    return await notesCollection.findOne({username: username})
      .then((result)=> {
        client.close()
        return result;
    }).catch((error)=> {
      console.error(error)
      client.close()});
  }
  
  async function deleteNotesByUsername(username) {
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    await client.connect()
    const notesCollection = client.db('notebook').collection('notes');
    return await notesCollection.deleteOne({username: username})
    .then((result)=> {
      client.close()
      return result.deletedCount;
    }).catch((error)=> {
      console.error(error)
      client.close()});
  }

module.exports = { insertNote, retrieveNotesByUsername, deleteNotesByUsername }