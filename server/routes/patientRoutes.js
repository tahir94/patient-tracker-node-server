var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

// Models
var Patient = mongoose.model('Patient', {
  patientName: String,
  patientAge: String,
  patientAddress: String,
  gender: String,
  id: String
})



router.post('/patient', function (req, res) {

  Patient.create({
    patientName: req.body.patientName,
    patientAge: req.body.patientAge,
    patientAddress: req.body.patientAddress,
    gender: req.body.gender,
    id: req.body.id
  },
    function (err, patient) {
      if (err) {
        res.send(err)
      }
      res.json(patient)
    })
})

router.get('/patients/:id', function (req, res) {
  Patient.find({ id: req.params.id }, function (err, patient) {
    if (err) {
      res.send(err)
    }
    res.json(patient)
  })

})

router.delete('/patient/:id', function (req, res) {
  Patient.remove({
    _id: req.params.id
  }, function (err, patient) {
    if (err) {
      console.log('delete err', err)
    }
    res.send({ id: req.params.id });
  })
})


module.exports = router
