SQL vs NoSQL
- SQL is a table
- NoSQL is a collection which is more of an array of objects

- Where an entry in SQL is a row
- In NoSQL, it's a document

- In SQL, there are columns (like name, age)
- In NoSQL, it's fields.


To Start Database
./mongo

Node MongoDB Native

Object Destructring

var user = {name: 'Sam', age: 30}
var {name } = user;


Getting ready for Heroku
- changing ports on server.js to be either environment variable or local
- telling Heroku how to start server by adding a start script to package.json
- telling Heroku which version of node to use by using engines in package.json
- setup database with heroku addon - mLab
- Use that link and change your database setting sin mongoose.js


./mongod --dbpath ../../mongo-data/
