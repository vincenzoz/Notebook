const MongoClient = require('mongodb').MongoClient;

const uri = process.env.MONGO_DB_URL

async function connect() {
    console.log('connect() ...')
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
            const collection = client.db("test").collection("students");
            collection.insertOne({name: 'hello world'})
            client.close();
        });
}

module.exports = { connect }