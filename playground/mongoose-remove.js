// even though
const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// To remove everything
  // Todo.remove({}).then((result) => {
  //   console.log(result)
  // })

// Find one and remove
  // Both returns removed doc back
// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove({})

  Todo.findByIdAndRemove('58c8a0d89875100e214977f2').then((todo) => {
    console.log(todo);
  })

  Todo.findOneAndRemove({_})
