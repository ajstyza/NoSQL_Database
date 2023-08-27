const express = require('express');
const {MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;

const client = new MongoClient(connectionStringURI);

let db;

// need to add dbName
const dbName = 'userDB'

client.connect()
.then(() => {
    console.log('Connected to MongoDB');

// client constructor to add new db instance
    db = client.db(dbName);

    app.listen(port, () => {
        console.log(`app listening at http://localhost:${port}`);
    });
})
.catch((err) => {
    console.error('Mongo connection error: ', err.message);
});

// Built in Express function that parses incoming requests to JSON
app.use(express.json());

// may also need create-many to post mutiple things
app.post('/create-many', (req, res) => {
db.collection('usersCollection').insertMany([
    {"tite": "balfsdafds"},
    {"title": "insevdv"}
])
.then(results => res.json(results))
.catch(err => {
  if (err) throw err;
})
});

app.post('/create', (req, res) => {
  // Use db connection to add a document
  db.collection('usersCollection').insertOne(
    { name: req.body.name, email: req.body.email, thoughts: req.body.thoughts, firends: req.body.friends}
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

app.get('/read', (req, res) => {
  // Use db connection to find all documents in collection
  db.collection('usersCollection')
    .find()
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

app.delete('/delete', (req, res) => {
  // Wrap the id in the ObjectId class to instantiate a new instance
  const userId = new ObjectId(req.body.id);

  // Use deleteOne() to delete one object
  db.collection('usersCollection').deleteOne(
    // This is the filter. We delete only the document that matches the _id provided in the request body.
    { _id: userId }
  )
    .then(results => {
      console.log(results);
      res.send(
        results.deletedCount ? 'User deleted' : 'No user found!'
      );
    })
    .catch(err => {
      if (err) throw err;
    });
});