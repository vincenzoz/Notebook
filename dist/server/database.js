const MongoClient=require("mongodb").MongoClient,uri=process.env.MONGO_DB_URL;async function connect(){console.log("connect() ...");const n=new MongoClient(uri,{useNewUrlParser:!0});n.connect((e=>{n.db("test").collection("students").insertOne({name:"hello world"}),n.close()}))}module.exports={connect};