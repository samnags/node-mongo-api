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
      type: String
    },
    completed: {
      type: Boolean
    },
    completedAt: {
      type: Number
    }
  })

  var newTodo = new Todo({
    text: 'Learn Mongoose'
  })

    save returns a promise
    newTodo.save().then((todo) => {
      console.log('Saved Todo', todo)
    }, (err) => {
      console.log('Unable to save todo')
    })

  var secondTodo = new Todo({
    text: 'Drink a cold brew',
    completed: true,
    completedAt: 20170310
    })

    secondTodo.save().then((todo) => {
      console.log('Todo Saved:', todo)
    }, (err) => {
      console.log('Unable to save todo', err)
    })
