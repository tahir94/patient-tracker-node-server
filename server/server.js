var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = require('./routes/patientRoutes');
var authRouter = require('./routes/authRouter');
var path = require('path');
var ejs = require('ejs');

var port = 3000;

mongoose.connect('mongodb://doctor:doctor123@ds125195.mlab.com:25195/patient-tracker', { useMongoClient: true });
mongoose.connection.on("connected", function () {
    console.log("moongose is connected")
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/hospital', router);
app.use('/auth', authRouter)

app.listen(port, function () {
    console.log('app started on port !')
})