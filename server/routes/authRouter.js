var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

mongoose.Promise = global.Promise
// Schema
var userSchema = new mongoose.Schema({
  userName: {type: String},
  userEmail: {type: String  },
  userPassword: {type: String},
// user_id : {type : String}
})
var User = mongoose.model('User', userSchema)

router.post('/signup', function (req, res, next) {
  var user = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword
  }

  var newUser = new User(user)

  newUser.save((err, success) => {
    if (err) {
      console.log('something wrong')
      if (err.code == 11000) {
		console.log('email already exist')
		res.status(303).send(err)
		
      }else {
        res.send('something went wrong on server')
      }
    }else {
      console.log('auth success res!', success)
      res.status(200).send(success)
    }
  })
})

// router.get('/signup',function(req,res,next){

// })

module.exports = router
