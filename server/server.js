var express = require('express')
var bodyParser = require('body-parser')

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')


// Moved this to mongoose.db
  // var mongoose = require('mongoose')
  // // we're telling mongoose that we want to use ES6 Promises, not third paty
  //   mongoose.Promise = global.Promise;
  //
  // // don't need callback like we did with mongodb because mongoose can handle ordering
  //   mongoose.connect('mongodb://localhost:27017/TodoApp');

var app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  console.log(req.body)
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then((todo) =>{
    res.send(todo)
  }, (e) => {
    res.status(400).send(e);
  })
})


// app.post('/users', (req, res) => {
//
// })




app.listen(3000, () => {
  console.log('Started on Port 3000')
})
