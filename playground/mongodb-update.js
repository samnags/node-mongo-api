  const { MongoClient, ObjectID } = require('mongodb')

  MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
    return console.log('There was an issue')
  }
  console.log('Connected to MongoDB Server')

// findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('58c335773eb608df54b1ac80')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result)
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('58c34d636fbbd90c68c09494')
  }, {
    $set: {
      name: 'Sam'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result)
  });

  // db.close()
});
