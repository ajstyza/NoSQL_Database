const express = require('express');
const {MongoClient} = require('mongodb');

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(connectionStringURI);

let db;

// need to add dbName
const dbName = ''

client.connect()
.then(() => {
    console.log('Connected to MongoDB');

// client constructor to add new db instance
    db = client.db(dbName);

    AutomaticPrefetchPlugin.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
})
.catch((err) => {
    console.error('Mongo connection error: ', err.message);
});

// Built in Express function that parses incoming requests to JSON
app.use(express.json());

app.post('/create', (req, res) => {
  // Use db connection to add a document
  db.collection('petCollection').insertOne(
    { name: req.body.name, breed: req.body.breed }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

app.get('/read', (req, res) => {
  // Use db connection to find all documents in collection
  db.collection('petCollection')
    .find()
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});
