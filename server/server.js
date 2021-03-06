require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')


// Moved this to mongoose.db
  // var mongoose = require('mongoose')
  // // we're telling mongoose that we want to use ES6 Promises, not third paty
  //   mongoose.Promise = global.Promise;
  //
  // // don't need callback like we did with mongodb because mongoose can handle ordering
  //   mongoose.connect('mongodb://localhost:27017/TodoApp');

var app = express()

// will be set if on heroku or not if it's locally
  // getting rid of this because Heroku will have it set and lines above will set it for test + development
  // const port = process.env.PORT || 3000
  const port = process.env.PORT;

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


app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      // by sending object vs the array, we have more options in future
      todos
    })
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo})
  }).catch((e) => {
    res.status(404).send()
  })
})

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      res.status(404).send()
    }
    res.status(200).send({todo})
  }).catch((e) => {
    res.status(404).send()
  })
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id
  // subset of the things user passes to us. Similar to strong params
  var body = _.pick(req.body, ['text', 'completed'])
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // if completed is a boolean and that boolean is true
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    // if not a boolean or not true
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
    res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

})

app.listen(port, () => {
  console.log(`Started up on Port ${port}`)
})

module.exports = {
  app
}
