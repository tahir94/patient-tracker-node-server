var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    // res.render('../../src/pages/home/home')
    // res.send('asdasd')
    res.render('home.html')
})
module.exports = router;
