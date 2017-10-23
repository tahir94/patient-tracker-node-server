var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Schema
// var userSchema = new mongoose.Schema({

// userName : {type : String},
// userEmail : {type : String,unique : true},
// userPassword : {type : String},
// // user_id : {type : String}

// })

// models

// var User = mongoose.model('User',userSchema);
var User = mongoose.model('User', {
    userName: String,
    userEmail: String,
    userPassword: String
});


router.post('/signup',function(req,res,next){
     
    var userName  = req.body.userName;
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword; 

    var newUser = new User();
    newUser.userName = userName;
    newUser.userEmail = userEmail;
    newUser.userPassword = userPassword;
   
    newUser.save((err,success)=>{
        if(err){
            console.log(err)
        }
        // res.json(success)
        res.send('success')
        console.log('auth success res!',success)
    })
    // newUser.save((err,success)){
        
    // })

})

// router.get('/signup',function(req,res,next){
    
        
// })

module.exports = router;