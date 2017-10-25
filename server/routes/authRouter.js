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

router.post('/login',function(req,res){

  var userEmail = req.body.userEmail;
  var userPassword = req.body.userPassword;
  User.findOne({userEmail : userEmail, userPassword : userPassword},function(err,user){
    if(err){
      ('err',err)
       res.status(500).send();
    }
    if(!user){
      ('!user')
       res.status(404).send('there is no user with this record');
    }
    else{
      ('user',user)
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
      ('something wrong')
      if (err.code == 11000) {
		('email already exist')
		res.status(303).send(err)
		
      }else {
        res.send('something went wrong on server')
      }
    }else {
      ('auth success res!', success)
      res.status(200).send(success)
    }
  })
})

// router.get('/signup',function(req,res,next){

// })

module.exports = router
