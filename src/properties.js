const express = require('express')
const router = express.Router();
const Property = require('@aramk/property-listing-models').Property;

const MongooseDocTransformer = require('./utils/MongooseDocTransformer');

router.get('/', function(req, res, next) {
  Property.find().then(properties => {
    res.send({
      properties: properties.map(MongooseDocTransformer.removeVersionKey),
      count: properties.length
    });
  }).catch(next);
});

router.get('/:id', function(req, res, next) {
  Property.findById(req.params.id).then(property => {
    res.send(MongooseDocTransformer.removeVersionKey(property));
  }).catch(next);
});

router.post('/', function(req, res, next) {
  Property.create(req.body).then(property => {
    res.send(MongooseDocTransformer.removeVersionKey(property));
  }).catch(next);
});

module.exports = router;
