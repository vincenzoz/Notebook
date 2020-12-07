const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGO_DB_URL

async function insertNote(noteRequest) {
  const client = new MongoClient(uri, {useUnifiedTopology: true});
  await client.connect();
  const collection = client.db('notebook').collection('notes');
  await collection.insertOne(noteRequest);
  client.close();
}

module.exports = { insertNote }