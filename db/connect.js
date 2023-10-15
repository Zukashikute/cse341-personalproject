const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require('mongodb');

const mongoURL = process.env.MONGO_URL

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(mongoURL);

let _db;

const initDb = callback => {
   if (_db) {
      console.log('Db is already initialized!');
      return callback(null, _db);
   }
   client.connect(mongoURL)
      .then(client => {
         _db = client;
         callback(null, _db);
      })
      .catch(err => {
         callback(err);
      });
};

const getDb = () => {
   if (!_db) {
      throw Error('Db not initialized');
   }
   return _db;
};

module.exports = {
   initDb,
   getDb
};