var express = require('express');
var router = express.Router();
var Band = require('../models/band');
const _ = require('lodash')

router.use(function (req, res, next) {
  req.body = _.pick(req.body, ['name', 'genre', 'corruptedByTheSystem'])
  next()
})


router.get('/', function (req, res, next) {
  Band.find({}, function (err, bands) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(bands)
    }
  })
})

router.post('/', function (req, res, next) {
  const band = new Band(req.body)
  band.save(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.json(band)
    }
  })
})


router.put('/:bandId', function (req, res, next) {
  Band.findByIdAndUpdate(req.params.bandId, { $set: req.body}, function (err, band) {
    if (err) {
      res.status(500).send()
    } else {
      if (band) {
        Band.findById(req.params.bandId, function (err, updatedBand) {
          res.json(updatedBand)
        })
      } else {
        res.status(404).send()
      }
    }
  })
})


router.delete('/:bandId', function (req, res, next) {
  Band.findById(req.params.bandId).remove(function (err) {
    if (err) {
      res.status(500).send()
    } else {
      res.status(204).send()
    }
  })
})


module.exports = router;
