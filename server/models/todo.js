var mongoose = require('mongoose')

// model is mongoose method to create a model
// first argument is string model name
// second argument is object that defines properties
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minLength: 1,
    trim: true // removes any trailing or leading white space
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

module.exports = {
  Todo
}


// var newTodo = new Todo({
//   text: 'Learn Mongoose'
// })
//
//   //save returns a promise
//   newTodo.save().then((todo) => {
//     console.log('Saved Todo', todo)
//   }, (err) => {
//     console.log('Unable to save todo')
//   })
//
// var secondTodo = new Todo({
//   text: 'Drink a cold brew',
//   completed: true,
//   completedAt: 20170310
//   })
//
//   secondTodo.save().then((todo) => {
//     console.log('Todo Saved:', todo)
//   }, (err) => {
//     console.log('Unable to save todo', err)
//   })
//
// var thirdTodo = new Todo({
//   text: {}
// })
//
//   thirdTodo.save().then((todo) => {
//     console.log('Todo Saved:', todo)
//   }, (err) => {
//     console.log('Unable to save todo', err)
//   })
