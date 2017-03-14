// don't need mongoose file, just need mongoose it'self
var mongoose = require('mongoose')

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
})

module.exports = {
  user
}

// var firstUser = new User({
//   email: 'sam@sam.com'
// })
//
// firstUser.save().then((user) => {
//   console.log(`${user} was saved`)
// }, (err) => {
//   console.log('User not saved', err)
// })
//
// var secondUser = new User({
//   email: ''
// })
//
// secondUser.save().then((user) => {
//   console.log(`${user} was saved`)
// }, (err) => {
//   console.log('User not saved', err.errors.email.message)
// })
