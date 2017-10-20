var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./routes/patientRoutes');
var index = require('./routes/index');
var path = require('path');
var ejs = require('ejs')
// import  { router } from './routes/patientRoutes'
// configuration
// import {} from '../server/src/pages/home/home'
var port = 3000;

mongoose.connect('mongodb://doctor:doctor123@ds125195.mlab.com:25195/patient-tracker',{ useMongoClient: true });
mongoose.connection.on("connected",function(){
    console.log("moongose is connected")
})

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// app.use(express.static(path.join(__dirname,'../server/src/pages')));

// app.engine('html',require('ejs').renderFile);
// app.set('views',__dirname);

// app.use('/',index);
app.use('/hospital',router)

app.listen(port,function(){
    console.log('app started on port !')
})