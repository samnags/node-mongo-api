  const expect = require('expect')
  const request = require('supertest')
  const {ObjectID} = require('mongodb')

// need to load in server.js so we have express app (for supertest)
// need todo model so we can test the model

  const { app } = require('./../server')
  const { Todo }= require('./../models/todo')

  const todos = [{
    _id: new ObjectID(),
    text: '1st Test To Do'
  }, {
    _id: new ObjectID(),
    text: '2nd Test To Do'
  }]


// handling the database
beforeEach((done) => {
  // will wipe all of todos
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
    // using expression syntax
  }).then(() => done())
})

describe('POST /todos', () => {

  // don't forget done when async requests
  it('should create new todo', (done) => {
    var text = 'Testing my todo'
    request(app)
      .post('/todos')
      // using object will be convered to json by supertest
      .send({text})  // same as .send({text: text})
      .expect(200)
      // custon expcts gest the response as part of callback
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      // we'll use .end to check if err and to check if todo model has a new todo
      .end((err, res) => {
        if (err) {
          // return stops function execution
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done()
          // using catch to deal with errors during callback
        }).catch((e) => done(e));
      })
  })

  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should find the correct todo', (done) => {
    var todo = todos[0]
    request(app)
      // grabbing first todo's ID and converting to string
       .get(`/todos/${todos[0]._id.toHexString()}`)
       .expect(200)
       .expect((res) => {
         expect(res.body.todo.text).toBe(todos[0].text)
       })
       .end(done)
  })

  it('should return a 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/58c8775c2bf4d37e15e2e616.toHexString()`)
      .expect(404)
      .end(done)
    // use hexsring + new object id. will be valid but not collection
  })

  it('should return a 404 if id is invalid', (done) => {
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('should delete the correct todo', (done) => {
    var todoId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${todoId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(todoId)
      })
      .end((err, res) => {
        if(err) {
          // if error, we'll return to prevent function execution and pass it error so mocha renders it
          return done(err);
        }
        Todo.findById(todoId).then((todo) => {
          expect(todo).toNotExist();
          done()
          // if there is an error, just pass it to catch
        }).catch((e) => {
          done(e)
        })
      })
  })

  it('should return a 404 if todo is not found', (done) => {
    var hexId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  })

  it('should return a 404 if id is invalid', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done)
  })
})
