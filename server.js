const express = require('express');
const {MongoClient, ObjectId } = require('mongodb');
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const connectionStringURI = `mongodb://127.0.0.1:27017/userDB`;
const client = new MongoClient(connectionStringURI);

let db;

// need to add dbName
const dbName = 'userDB'

mongoose.connect(connectionStringURI);
// .then(() => {
//     console.log('Connected to MongoDB');

// // client constructor to add new db instance
//     db = client.db(dbName);

//     app.listen(port, () => {
//         console.log(`app listening at http://localhost:${port}`);
//     });
// })
// .catch((err) => {
//     console.error('Mongo connection error: ', err.message);
// });

// Built in Express function that parses incoming requests to JSON
app.use(express.json());


app.post('/create', (req, res) => {
User.create(req.body)
    .then(results => res.json(results))
    .catch(err => {
      console.log(err)
      res.json(err)
    });

});

app.get('/', (req, res) => {
  User.find()
      .then(results => res.json(results))
      .catch(err => {
        console.log(err)
        res.json(err)
      });
  
  });

  app.delete('/delete/:id', (req, res) => {
    User.findOneAndDelete({_id: req.params.id})
        .then(results => res.json(results))
        .catch(err => {
          console.log(err)
          res.json(err)
        });
    
    });

    app.put('/update/:id', (req, res) => {
      User.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
          .then(results => res.json(results))
          .catch(err => {
            console.log(err)
            res.json(err)
          });
      
      });

      app.get('/:id', (req, res) => {
        User.findOne({_id: req.params.id})
            .then(results => res.json(results))
            .catch(err => {
              console.log(err)
              res.json(err)
            });
        });

// deletes User by id
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



// 

// find thought (not working yet)
app.get('/thought/:thoughtId', (req, res) => {
  const thoughtId = new ObjectId(req.body.thought);
  db.collection('usersCollection').findOne(
    {_id: thoughtId}
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

app.get('/users', (req, res) => {
  // Use db connection to find all documents in collection
  db.collection('usersCollection')
    .find()
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});



mongoose.connection.once('open', () => {
  app.listen(port, () => {
            console.log(`app listening at http://localhost:${port}`);
        });
});