const { MongoClient } = require("mongodb");

let db = null;

async function connectDB() {
  const url =
    "mongodb+srv://orbitpay-user:7jD0vquLNsL0CKAx@orbitpay-cluster.qg08k.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);

  try {
    await client.connect();
    db = client.db("quiz");
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err);
  }
}

async function getDB() {
  if (!db) await connectDB();

  return db;
}

module.exports = { getDB: getDB, db: db };
