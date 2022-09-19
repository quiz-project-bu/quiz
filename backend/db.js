const { MongoClient } = require("mongodb");

let db = null;

async function connectDB() {
  const url = process.env.DB_URL;
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
