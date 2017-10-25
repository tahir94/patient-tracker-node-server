var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Schema
var userSchema = new mongoose.Schema({
  userName: { type: String },
  userEmail: { type: String },
  userPassword: { type: String },
})

// model
var User = mongoose.model('User', userSchema)

router.post('/login', function (req, res) {

  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  User.findOne({ userEmail: userEmail, userPassword: userPassword }, function (err, user) {
    if (err) {
      console.log(err)
      res.status(500).send();
    }
    if (!user) {
      res.status(404).send('there is no user with this record');
    }
    else {
      console.log(user)
      res.status(200).send(user);
    }
  })
})

router.post('/signup', function (req, res, next) {
  var user = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword
  }

  var newUser = new User(user)

  newUser.save((err, success) => {
    if (err) {
      console.log(err)
      if (err.code == 11000) {

        res.status(303).send(err)

      } else {
        res.send('something went wrong on server')
      }
    } else {
      console.log(success)
      res.status(200).send(success)
    }
  })
})


module.exports = router
