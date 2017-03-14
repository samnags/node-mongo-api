// even though
const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var id = '58c8775c2bf4d37e15e2e61511'

// checking wither the ObjectID is not valid
  // if (!ObjectID.isValid(id)) {
  //   console.log('ID not valid')
  // }

  Todo.find({
    // Mongoose can convert string to object id automatically
    _id: id
  }).then((todos) => {
    console.log('Finding all Todos with a certain ID')
    console.log('Todos:', todos)
  })

  Todo.find({
    // Mongoose can convert string to object id automatically
    completed: false
  }).then((todos) => {
    console.log('Finding all Todos with a false completion')
    console.log('Todos:', todos)
  })

  Todo.findOne({
    completed: false
  }).then((todo) => {
    console.log('Finding one Todos with a false completion')
    console.log('Todo:', todo)
  })

  Todo.findById(id).then((todo) => {
    console.log('Todo By Id')
    if (!todo) {
      return console.log('ID Not Found')
    }
    console.log('Todo:', todo)
    // need a catch because a user could input an ID that isn't valid
  }).catch((e) => {
    console.log(e)
  })

  // query users collection, user.findbyId
  // handle three cases
     // - query works, but no user
     // - handle user Found
     // - handle other errors

    User.findById('58c8505b1db64e4606b230c5').then((user) => {
      if (!user) {
        return console.log('No user of that ID')
      }
      console.log('Finding user with FindById')
      console.log('User:', user)
    }).catch((e) => {
      console.log(e)
    })
