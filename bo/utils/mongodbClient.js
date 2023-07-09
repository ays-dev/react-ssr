const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'local';

module.exports = function mongodbClient(collectionName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) { return reject(err); }
      console.log('Connected successfully to server');

      const db = client.db(dbName);
      // Get the documents collection
      const collection = db.collection(collectionName);
      return resolve({ collection, client });
    });
  });
}
