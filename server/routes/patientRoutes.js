var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
// Models
var Patient = mongoose.model('Patient', {
  patientName: String,
  patientAge: String,
  patientAddress: String,
  gender: String
})

router.post('/patient', function (req, res) {
  console.log('posting patient !')
  Patient.create({
    patientName: req.body.patientName,
    patientAge: req.body.patientAge,
    patientAddress: req.body.patientAddress,
    gender: req.body.gender
  }, function (err, patient) {
    if (err) {
      res.send(err)
    }
    console.log('patient responce !!',patient)
    res.json(patient)
  })
})

router.get('/patient/:id', function (req, res) {
	console.log('getting patient !')
	Patient.create({
	  patientName: req.body.patientName,
	  patientAge: req.body.patientAge,
	  patientAddress: req.body.patientAddress,
	  gender: req.body.gender
	}, function (err, patient) {
	  if (err) {
		res.send(err)
	  }
	  console.log('patient responce !!')
	  res.json(patient)
	})
  })

  router.get('/patients', function (req, res) {
	console.log('multiple patients !')
	Patient.create({
	  patientName: req.body.patientName,
	  patientAge: req.body.patientAge,
	  patientAddress: req.body.patientAddress,
	  gender: req.body.gender
	}, function (err, patient) {
	  if (err) {
		res.send(err)
	  }
	  console.log('patient responce !!')
	  res.json(patient)
	})
  })

  // router.put('/patient/:id', function (req, res) {
	// console.log('creating patient !')
	// Patient.create({
	//   patientName: req.body.patientName,
	//   patientAge: req.body.patientAge,
	//   patientAddress: req.body.patientAddress,
	//   gender: req.body.gender
	// }, function (err, patient) {
	//   if (err) {
	// 	res.send(err)
	//   }
	//   console.log('patient responce !!')
	//   res.json(patient)
	// })
  // })

  // router.delete('/patient/:id', function (req, res) {
	// console.log('getting patient !')
	// Patient.create({
	//   patientName: req.body.patientName,
	//   patientAge: req.body.patientAge,
	//   patientAddress: req.body.patientAddress,
	//   gender: req.body.gender
	// }, function (err, patient) {
	//   if (err) {
	// 	res.send(err)
	//   }
	//   console.log('patient responce !!')
	//   res.json(patient)
	// })
  // })


module.exports = router
