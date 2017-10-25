var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
// Models
var Patient = mongoose.model('Patient', {
  patientName: String,
  patientAge: String,
  patientAddress: String,
  gender : String,
  id    : String
})



router.post('/patient', function (req, res) {
  ('posting patient !',req.body)
  Patient.create({
    patientName: req.body.patientName,
    patientAge: req.body.patientAge,
    patientAddress: req.body.patientAddress,
	gender: req.body.gender,
	id : req.body.id
  }, function (err, patient) {
    if (err) {
      res.send(err)
    }
    ('patient responce !!', patient)
    res.json(patient)
  })
})

router.get('/patient/:id', function (req, res) {
  ('getting patient !')
  Patient.create({
    patientName: req.body.patientName,
    patientAge: req.body.patientAge,
    patientAddress: req.body.patientAddress,
    gender: req.body.gender
  }, function (err, patient) {
    if (err) {
      res.send(err)
    }
    ('patient responce !!')
    res.json(patient)
  })
})
router.get('/patients/:id', function (req, res) {
	('multiple patients !')
	Patient.find({id : req.params.id},function (err, patient) {
	  if (err) {
		res.send(err)
	  }
	  ('patient responce !!')
	  res.json(patient)    
	})
	 
  })
// router.get('/patients/:currentUserId', function (req, res) {
//   ('multiple patients !')
//   Patient.find({"id": currentUserId},function (err, patient) {
//     if (err) {
//       res.send(err)
//     }
//     ('patient responce !!')
//     res.json(patient)    
//   })
   
// })

// router.put('/patient/:id', function (req, res) {
// ('creating patient !')
// Patient.create({
//   patientName: req.body.patientName,
//   patientAge: req.body.patientAge,
//   patientAddress: req.body.patientAddress,
//   gender: req.body.gender
// }, function (err, patient) {
//   if (err) {
// 	res.send(err)
//   }
//   ('patient responce !!')
//   res.json(patient)
// })
// })

router.delete('/patient/:id', function (req, res) {
  Patient.remove({
    _id: req.params.id
  }, function (err, patient) {
    if (err) {
      ('err', err)
    }
    ('success', patient)
    res.send({id : req.params.id});
  })
})

// router.delete('/patient/:id', function (req, res) {
// ('getting patient !')
// Patient.create({
//   patientName: req.body.patientName,
//   patientAge: req.body.patientAge,
//   patientAddress: req.body.patientAddress,
//   gender: req.body.gender
// }, function (err, patient) {
//   if (err) {
// 	res.send(err)
//   }
//   ('patient responce !!')
//   res.json(patient)
// })
// })

module.exports = router
