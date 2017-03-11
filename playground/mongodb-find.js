  const { MongoClient, ObjectID } = require('mongodb')

  MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
    return console.log('There was an issue')
  }
  console.log('Connected to MongoDB Server')

// fetching all Todos from collection
// find method returns curser, aka pointers to objects rather than objects thesmelves
// toArray returns a promise
// to filter Find, you pass in query to find
  // db.collection('Todos').find({
  //   // can't just search string because it's not a string, it's an object ID, so you have to createa a new one to find by object id
  //   _id: new ObjectID("58c3398c2bdc1acabb830f76")
  // }).toArray().then((docs) => {
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, err => {
  //   console.log('Unable to load todos, err')
  // })

  db.collection('Todos').find().count().then((count) => {
    console.log(`Todos Count: ${count}`)
  }, err => {
    console.log('Unable to load todos', err)
  })

  db.collection('Users').find({name: 'Sam'}).toArray().then((docs) => {
    console.log(`Todos With Name Sam`)
    console.log(JSON.stringify(docs, undefined, 2))
  }, err => {
    console.log('Unable to load todos', err)
  })



  // db.close()
});
