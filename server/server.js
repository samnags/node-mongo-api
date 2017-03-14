var mongoose = require('mongoose')

// we're telling mongoose that we want to use ES6 Promises, not third paty
  mongoose.Promise = global.Promise;

// don't need callback like we did with mongodb because mongoose can handle ordering
  mongoose.connect('mongodb://localhost:27017/TodoApp');

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

  var User = mongoose.model('User', {
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    }
  })

  var firstUser = new User({
    email: 'sam@sam.com'
  })

  firstUser.save().then((user) => {
    console.log(`${user} was saved`)
  }, (err) => {
    console.log('User not saved', err)
  })

  var secondUser = new User({
    email: ''
  })

  secondUser.save().then((user) => {
    console.log(`${user} was saved`)
  }, (err) => {
    console.log('User not saved', err.errors.email.message)
  })
