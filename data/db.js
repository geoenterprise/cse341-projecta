const dotenv = require('dotenv');
dotenv.config();

const Mongoclient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
  if (database) {
    console.warn('Db is already initialized');
    return callback(null, database);
  }

  Mongoclient.connect(process.env.MONGO_URI)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error('Db has not been initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDb,
};
