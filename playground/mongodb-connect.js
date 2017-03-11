// In MongoDB, you don't have to create a DB to use it. You just give it a name.
  // const MongoClient = require('mongodb').MongoClient;
// with MongoClient in place, we can call it to connect to database

// Doing same as above with object destructuring
  const { MongoClient, ObjectID } = require('mongodb')


// first argument is string of url where datbase lives, i.e. AWS or Heroku
// second argument is a callback to fire after connection success or fails
// first argument of callback is err and second argument is the db oject
  MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
// using a return statement to prevent rest of function from running
    return console.log('There was an issue')
  }
  console.log('Connected to MongoDB Server')

// db.collection takes argument of colletion you're making. Don't need to a create collection
// insertOne takes argument of object you're putting in and a callback
  // db.collection('Todos').insertOne({
  //   text: 'Return shaker bottle',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
// returning string and the resulting error
      // return console.log('Unable to insert todo', err)
    // }
// passing in ops, which stores all of the doc's inserted.
    // console.log(JSON.stringify(result.ops, undefined, 2))
  // })


// was able to call without callback function ...
  // db.collection('Users').insertOne({
  //   name: 'Sam',
  //   age: 30,
  //   location: 'CA'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err)
  //   }
  //   console.log(result.ops[0]._id.getTimestamp())
  // })

// closing connection with db server
  db.close()
});
