var mongoose = require('mongoose')

// we're telling mongoose that we want to use ES6 Promises, not third party
  mongoose.Promise = global.Promise;

// don't need callback like we did with mongodb because mongoose can handle ordering
  // mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
  mongoose.connect(process.env.MONGODB_URI)

module.exports = {
  mongoose
}
