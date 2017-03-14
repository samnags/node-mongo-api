  const expect = require('expect')
  const request = require('supertest')

// need to load in server.js so we have express app (for supertest)
// need todo model so we can test the model

  const { app } = require('./../server')
  const { Todo }= require('./../models/todo')

// handling the database
beforeEach((done) => {
  // will wipe all of todos
  Todo.remove({}).then(() => {
    done()
  })
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

        Todo.find().then((todos) => {
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
          expect(todos.length).toBe(0)
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })
})
